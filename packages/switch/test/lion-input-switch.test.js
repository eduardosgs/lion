import { expect, fixture, html } from '@open-wc/testing';

import { LionButton } from '@lion/button';

import '../lion-input-switch.js';

describe('lion-input-switch', () => {
  it('should have default "input" element', async () => {
    const el = await fixture(html`
      <lion-input-switch></lion-input-switch>
    `);
    expect(el.slots).to.have.a.property('input');
    expect(el).to.have.a.property('inputElement');
    expect(el.slots.input()).to.be.an.instanceof(LionButton);
    expect(el.inputElement).to.be.an.instanceof(LionButton);
  });

  it('should trickle "checked" state to child button', async () => {
    // given
    const uncheckedEl = await fixture(html`
      <lion-input-switch></lion-input-switch>
    `);
    const checkedEl = await fixture(html`
      <lion-input-switch checked></lion-input-switch>
    `);
    // then
    expect(uncheckedEl.inputElement.checked).to.be.false;
    expect(checkedEl.inputElement.checked).to.be.true;
    // when
    uncheckedEl.checked = true;
    checkedEl.checked = false;
    await uncheckedEl.updateComplete;
    await checkedEl.updateComplete;
    // then
    expect(uncheckedEl.inputElement.checked).to.be.true;
    expect(checkedEl.inputElement.checked).to.be.false;
  });

  it('should sync "checked" state received from child button', async () => {
    // given
    const el = await fixture(html`
      <lion-input-switch></lion-input-switch>
    `);
    const button = el.inputElement;
    // then
    expect(el.checked).to.be.false;
    // when
    button.click();
    // then
    expect(el.checked).to.be.true;
    // when
    button.click();
    // then
    expect(el.checked).to.be.false;
  });
});
