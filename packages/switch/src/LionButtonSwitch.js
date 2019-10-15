import { LionButton } from '@lion/button';
import { html, css } from '@lion/core';

export class LionButtonSwitch extends LionButton {
  static get properties() {
    return {
      readOnly: {
        type: Boolean,
        reflect: true,
        attribute: 'readonly',
      },
      pressed: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          width: 36px;
          flex: none;
        }
      `,
    ];
  }

  _renderAfter() {
    return html`
      ${this.pressed}
    `;
  }

  constructor() {
    super();
    this.role = 'button';
    this.pressed = false;
  }

  attributeChangedCallback(key, fresh, stale) {
    super.attributeChangedCallback(key, fresh, stale);
    if (key === 'active' && this.active) {
      this.pressed = !this.pressed;
    }
  }
}
