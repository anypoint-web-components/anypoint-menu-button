import { html } from 'lit-html';
import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '@anypoint-web-components/anypoint-button/anypoint-icon-button.js';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '../anypoint-menu-button.js';

class DemoPage extends ArcDemoPage {
  constructor() {
    super();
    this.initObservableProperties([
      'demoCompatibility',
      'demoDisabled',
      'demoIgnoreSelect',
      'noOverlap',
      'closeOnActivate'
    ]);
    this._componentName = 'anypoint-menu-button';

    this.demoStates = ['Material Design', 'Anypoint'];

    this._demoStateHandler = this._demoStateHandler.bind(this);
    this._toggleMainOption = this._toggleMainOption.bind(this);
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _demoStateHandler(e) {
    const state = e.detail.value;
    switch (state) {
      case 0:
        this.demoCompatibility = false;
        break;
      case 1:
        this.demoCompatibility = true;
        break;
    }
  }

  _demoTemplate() {
    const {
      demoStates,
      demoCompatibility,
      darkThemeActive,
      demoDisabled,
      demoIgnoreSelect,
      noOverlap,
      closeOnActivate
    } = this;
    return html`
      <section class="documentation-section">
        <h3>Interactive demo</h3>
        <p>
          This demo lets you preview the text field element with various
          configuration options.
        </p>
        <arc-interactive-demo
          .states="${demoStates}"
          @state-chanegd="${this._demoStateHandler}"
          ?dark="${darkThemeActive}"
        >
          <anypoint-menu-button
            slot="content"
            ?compatibility="${demoCompatibility}"
            ?disabled="${demoDisabled}"
            ?ignoreSelect="${demoIgnoreSelect}"
            ?noOverlap="${noOverlap}"
            ?closeOnActivate="${closeOnActivate}"
          >
            <anypoint-icon-button
              slot="dropdown-trigger"
              aria-label="activate for context menu"
              ?compatibility="${demoCompatibility}">
              <iron-icon icon="menu" alt="menu"></iron-icon>
            </anypoint-icon-button>
            <anypoint-listbox
              slot="dropdown-content"
              ?compatibility="${demoCompatibility}">
              <anypoint-item>alpha</anypoint-item>
              <anypoint-item>beta</anypoint-item>
              <anypoint-item>gamma</anypoint-item>
              <anypoint-item>delta</anypoint-item>
              <anypoint-item>epsilon</anypoint-item>
            </anypoint-listbox>
          </anypoint-menu-button>

          <label slot="options" id="mainOptionsLabel">Options</label>
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="demoIgnoreSelect"
            @change="${this._toggleMainOption}">Ignore select</anypoint-checkbox>
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="demoDisabled"
            @change="${this._toggleMainOption}">Disabled</anypoint-checkbox>
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="noOverlap"
            @change="${this._toggleMainOption}">No overlap</anypoint-checkbox>
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="closeOnActivate"
            @change="${this._toggleMainOption}">Close on activate</anypoint-checkbox>

        </arc-interactive-demo>
      </section>
    `;
  }

  _introductionTemplate() {
    return html`
      <section class="documentation-section">
        <h3>Introduction</h3>
        <p>
          This component is based on Material Design chip and adjusted for
          Anypoint platform components.
        </p>
        <p>
          Anypoint web components are set of components that allows to build
          Anypoint enabled UI in open source projects.
        </p>
        <p>
          Menu button renders a trigger icon button which, once activated, renders
          a drodown menu. The button is to be used as a context action list.
        </p>
      </section>
    `;
  }

  _usageTemplate() {
    return html`
      <section class="documentation-section">
        <h2>Usage</h2>
        <p>Anypoint menu button comes with 2 predefied styles:</p>
        <ul>
          <li><b>Material Design</b> - Normal state</li>
          <li>
            <b>Compatibility</b> - To provide compatibility with Anypoint design
          </li>
        </ul>

        <h3>Basic usage</h3>

        <p>
          The element accepts another element as a trigger button via "dropdown-trigger" slot.
          When the user click on the trigger the menu will pop up.
          The trigger can be any element but suggested ones are button, anypoint-button, or anypoint-icon-button.
        </p>

        <p>
          Dropdown content can be any HTML element. It is handled via "dropdown-content" slot.
          Menu button should be used with list items so duggested dropdown content is
          anypoint-listbox with anypoint-item.
        </p>

        <details>
          <summary>Code example</summary>
          <code>
            <pre>
            ${`<anypoint-menu-button>
              <anypoint-icon-button
                slot="dropdown-trigger"
                aria-label="activate for context menu">
                <iron-icon icon="menu" alt="menu"></iron-icon>
              </anypoint-icon-button>
              <anypoint-listbox
                slot="dropdown-content">
                <anypoint-item>alpha</anypoint-item>
                <anypoint-item>beta</anypoint-item>
                <anypoint-item>gamma</anypoint-item>
                <anypoint-item>delta</anypoint-item>
                <anypoint-item>epsilon</anypoint-item>
              </anypoint-listbox>
            </anypoint-menu-button>`}
            </pre>
          </code>
        </details>
      </section>
    `;
  }

  contentTemplate() {
    return html`
      <h2>Anypoint menu button</h2>
      ${this._demoTemplate()}
      ${this._introductionTemplate()}
      ${this._usageTemplate()}
    `;
  }
}

const instance = new DemoPage();
instance.render();
window._demo = instance;
