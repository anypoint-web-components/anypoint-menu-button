# Deprecated

This component has been moved to `anypoint-web-components/awc`.

-----

A material design button that triggers a menu, also styled for Anypoint platform.

Anypoint web components are set of components that allows to build Anypoint enabled UI in open source projects.

Menu button renders a trigger icon button which, once activated, renders a drodown menu. The button is to be used as a context action list.

## Usage

### Installation
```
npm install --save @anypoint-web-components/anypoint-menu-button
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@anypoint-web-components/anypoint-menu-button/anypoint-menu-button.js';
      import '@anypoint-web-components/anypoint-button/anypoint-icon-button.js';
      import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
      import '@anypoint-web-components/anypoint-item/anypoint-item.js';
      import '@polymer/iron-icons/iron-icons.js';
      import '@polymer/iron-icon/iron-icon.js';
    </script>
  </head>
  <body>
    <anypoint-menu-button>
      <anypoint-icon-button
        slot="dropdown-trigger"
        aria-label="activate for context menu">
        <iron-icon icon="menu" alt="menu"></iron-icon>
      </anypoint-icon-button>
      <anypoint-listbox slot="dropdown-content">
        <anypoint-item>alpha</anypoint-item>
        <anypoint-item>beta</anypoint-item>
        <anypoint-item>gamma</anypoint-item>
        <anypoint-item>delta</anypoint-item>
        <anypoint-item>epsilon</anypoint-item>
      </anypoint-listbox>
    </anypoint-menu-button>

    <script>
    {
      document.querySelector('anypoint-menu-button').onselect = () => {
        // an item is selected.
        // This is the same event dispatched by the `anypoint-listbox`
      };
    }
    </script>
  </body>
</html>
```

### In a LitElement

```js
import { LitElement, html } from 'lit-element';
import '@anypoint-web-components/anypoint-menu-button/anypoint-menu-button.js';
import '@anypoint-web-components/anypoint-button/anypoint-icon-button.js';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';

class SampleElement extends LitElement {
  render() {
    return html`
    <anypoint-menu-button
      slot="content"
      ?compatibility="${compatibility}"
      ?disabled="${disabled}"
      ?ignoreSelect="${ignoreSelect}"
      ?noOverlap="${noOverlap}"
      ?closeOnActivate="${closeOnActivate}"
    >
      <anypoint-icon-button
        slot="dropdown-trigger"
        aria-label="activate for context menu"
        ?compatibility="${compatibility}">
        <iron-icon icon="menu" alt="menu"></iron-icon>
      </anypoint-icon-button>
      <anypoint-listbox
        slot="dropdown-content"
        ?compatibility="${compatibility}">
        <anypoint-item>alpha</anypoint-item>
        <anypoint-item>beta</anypoint-item>
        <anypoint-item>gamma</anypoint-item>
        <anypoint-item>delta</anypoint-item>
        <anypoint-item>epsilon</anypoint-item>
      </anypoint-listbox>
    </anypoint-menu-button>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

## Development

```sh
git clone https://github.com/anypoint-web-components/anypoint-menu-button
cd anypoint-menu-button
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests
```sh
npm test
```
