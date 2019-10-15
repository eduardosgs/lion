import { storiesOf, html } from '@open-wc/demoing-storybook';

import '../lion-input-switch.js';

storiesOf('Switches|Switch', module)
  .add(
    'Default',
    () => html`
      <lion-input-switch></lion-input-switch>
    `,
  )
  .add(
    'Full',
    () => html`
      <lion-input-switch label="Label" help-text="Help text">
        <div slot="after">After</div>
      </lion-input-switch>
    `,
  );
