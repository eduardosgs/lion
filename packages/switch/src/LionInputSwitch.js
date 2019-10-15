import { html, css } from '@lion/core';
import { LionField } from '@lion/field';
import { ChoiceInputMixin } from '@lion/choice-input';

import '../lion-button-switch.js';

export class LionInputSwitch extends ChoiceInputMixin(LionField) {
  static get styles() {
    return [
      css`
        :host {
          display: inline-block;
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
      <span class="switch__slots">
        <slot name="label"></slot>
        <slot name="help-text"></slot>
        <slot name="after"></slot>
        <slot></slot>
      </span>
      <slot name="input"></slot>
    `;
  }
}
