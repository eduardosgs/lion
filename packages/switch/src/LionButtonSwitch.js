import { LionButton } from '@lion/button';
import { html, css } from '@lion/core';

export class LionButtonSwitch extends LionButton {
  static get properties() {
    return {
      checked: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: inline-block;
          position: relative;
          width: 36px;
          height: 16px;
        }

        .button-switch__track {
          background: #eee;
          width: 100%;
          height: 100%;
        }

        .button-switch__thumb {
          background: #ccc;
          width: 50%;
          height: 100%;
          position: absolute;
          top: 0;
        }

        :host([checked]) .button-switch__thumb {
          right: 0;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="button-switch__track"></div>
      <div class="button-switch__thumb"></div>
    `;
  }

  constructor() {
    super();
    this.type = 'button';
    this.checked = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.__toggleStateHandler = () => {
      this.checked = !this.checked;
      this.dispatchEvent(
        new CustomEvent('checked-changed', {
          composed: true,
          bubbles: true,
          detail: this.checked,
        }),
      );
    };
    this.addEventListener('click', this.__toggleStateHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.__toggleStateHandler) {
      this.removeEventListener('click', this.__toggleStateHandler);
      this.__toggleStateHandler = null;
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (!changedProperties) {
      return;
    }
    if (changedProperties.has('checked')) {
      this.setAttribute('aria-pressed', `${this.checked}`);
    }
  }
}
