import { html, css } from '@lion/core';
import { LionField } from '@lion/field';
import { ChoiceInputMixin } from '@lion/choice-input';

import '../lion-button-switch.js';

export class LionInputSwitch extends ChoiceInputMixin(LionField) {
  static get properties() {
    return {
      disabled: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host([disabled]) {
          color: #adadad;
        }
      `,
    ];
  }

  get slots() {
    return {
      ...super.slots,
      input: () => document.createElement('lion-button-switch'),
    };
  }

  render() {
    return html`
      <div class="switch__slots">
        <slot name="label"></slot>
        <slot name="help-text"></slot>
        <slot name="feedback"></slot>
      </div>
      <slot name="input"></slot>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._setupButtonSwitch();
    this._syncButtonSwitch();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanButtonSwitch();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    this._syncButtonSwitch();
  }

  // TODO: should be replaced by "_inputNode"
  // after the next breaking change
  get _buttonSwitchNode() {
    return this.querySelector('[slot=input]');
  }

  _setupButtonSwitch() {
    this._buttonCheckedHandler = e => {
      this.checked = e.detail;
    };
    this._buttonSwitchNode.addEventListener('checked-changed', this._buttonCheckedHandler);
  }

  _cleanButtonSwitch() {
    if (this._buttonCheckedHandler) {
      this._buttonSwitchNode.removeEventListener('checked-changed', this._buttonCheckedHandler);
      this._buttonCheckedHandler = null;
    }
  }

  _syncButtonSwitch() {
    this._buttonSwitchNode.checked = this.checked;
    this._buttonSwitchNode.disabled = this.disabled;
  }
}
