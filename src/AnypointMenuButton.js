import { html, css, LitElement } from 'lit-element';
import '@anypoint-web-components/anypoint-dropdown/anypoint-dropdown.js';
import { ControlStateMixin } from '@anypoint-web-components/anypoint-control-mixins/control-state-mixin.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export class AnypointMenuButton extends ControlStateMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        position: relative;
        padding: 8px;
        outline: none;
      }

      :host([disabled]) {
        cursor: auto;
        color: var(--disabled-text-color);
      }

      .dropdown-content {
        box-shadow: var(--anypoiont-dropdown-shaddow);
        position: relative;
        border-radius: 2px;
        background-color: var(--anypoiont-menu-button-dropdown-background, var(--primary-background-color));
      }

      :host([verticalalign="top"]) .dropdown-content {
        margin-bottom: 20px;
        margin-top: -10px;
        top: 10px;
      }

      :host([verticalalign="bottom"]) .dropdown-content {
        bottom: 10px;
        margin-bottom: -10px;
        margin-top: 20px;
      }

      #trigger {
        cursor: pointer;
      }

      :host([compatibility]) .dropdown-content {
        box-shadow: none;
        border-top-width: 2px;
        border-bottom-width: 2px;
        border-top-color: var(--anypoint-menu-button-border-top-color, var(--anypoint-color-aluminum4));
        border-bottom-color: var(--anypoint-menu-button-border-bottom-color, var(--anypoint-color-aluminum4));
        border-top-style: solid;
        border-bottom-style: solid;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * True if the content is currently displayed.
       */
      opened: { type: Boolean },
      /**
       * The orientation against which to align the menu dropdown
       * horizontally relative to the dropdown trigger.
       */
      horizontalAlign: { type: String, reflect: true },
      /**
       * The orientation against which to align the menu dropdown
       * vertically relative to the dropdown trigger.
       */
      verticalAlign: { type: String, reflect: true },
      /**
       * If true, the `horizontalAlign` and `verticalAlign` properties will
       * be considered preferences instead of strict requirements when
       * positioning the dropdown and may be changed if doing so reduces
       * the area of the dropdown falling outside of `fitInto`.
       */
      dynamicAlign: { type: Boolean },
      /**
       * A pixel value that will be added to the position calculated for the
       * given `horizontalAlign`. Use a negative value to offset to the
       * left, or a positive value to offset to the right.
       */
      horizontalOffset: { type: Number },
      /**
       * A pixel value that will be added to the position calculated for the
       * given `verticalAlign`. Use a negative value to offset towards the
       * top, or a positive value to offset towards the bottom.
       */
      verticalOffset: { type: Number },
      /**
       * If true, the dropdown will be positioned so that it doesn't overlap
       * the button.
       */
      noOverlap: { type: Boolean },
      /**
       * Set to true to disable animations when opening and closing the
       * dropdown.
       */
      noAnimations: { type: Boolean },
      /**
       * By default, the dropdown will constrain scrolling on the page
       * to itself when opened.
       * Set to true in order to prevent scroll from being constrained
       * to the dropdown when it opens.
       */
      allowOutsideScroll: { type: Boolean },
      /**
       * Whether focus should be restored to the button when the menu closes.
       */
      restoreFocusOnClose: { type: Boolean },
      /**
       * Set to true to disable automatically closing the dropdown after
       * a selection has been made.
       */
      ignoreSelect: { type: Boolean },

      /**
       * Set to true to enable automatically closing the dropdown after an
       * item has been activated, even if the selection did not change.
       */
      closeOnActivate: { type: Boolean },
      /**
       * Enables Anypoint compatibility
       */
      compatibility: { type: Boolean, reflect: true },
      /**
       * This is the element intended to be bound as the focus target
       * for the `iron-dropdown` contained by `paper-menu-button`.
       */
      _dropdownContent: { type: Object }
    };
  }

  get dropdown() {
    return this.shadowRoot.querySelector('#dropdown');
  }

  get opened() {
    return this._opened;
  }

  set opened(value) {
    const old = this._opened;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this._opened = value;
    this.requestUpdate('opened', old);
    this._openedChanged(value, old);
  }

  get contentElement() {
    const slot = this.shadowRoot.querySelector('#content');
    /* istanbul ignore if */
    if (!slot) {
      return null;
    }
    const nodes = slot.assignedNodes();
    for (let i = 0, l = nodes.length; i < l; i++) {
      if (nodes[i].nodeType === Node.ELEMENT_NODE) {
        return nodes[i];
      }
    }
    /* istanbul ignore if */
    return null;
  }
  /**
   * @return {Function} Previously registered handler for `select` event
   */
  get onselect() {
    return this._onselect;
  }
  /**
   * Registers a callback function for `select` event
   * @param {Function} value A callback to register. Pass `null` or `undefined`
   * to clear the listener.
   */
  set onselect(value) {
    this._registerCallback('select', value);
  }

  constructor() {
    super();
    this._activateHandler = this._activateHandler.bind(this);
    this._selectHandler = this._selectHandler.bind(this);

    this.horizontalOffset = 0;
    this.verticalOffset = 0;
    this.horizontalAlign = 'left';
    this.verticalAlign = 'top';
  }

  connectedCallback() {
    /* istanbul ignore else */
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this.setAttribute('role', 'group');
    this.setAttribute('aria-haspopup', 'true');
    this.addEventListener('activate', this._activateHandler);
    this.addEventListener('select', this._selectHandler);
  }

  disconnectedCallback() {
    /* istanbul ignore else */
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
    this.removeEventListener('activate', this._activateHandler);
    this.removeEventListener('select', this._selectHandler);
  }

  _openedHandler(e) {
    this.opened = e.detail.value;
  }
  /**
  * Toggles the dropdown content between opened and closed.
  */
  toggle() {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }
  /**
   * Make the dropdown content appear as an overlay positioned relative
   * to the dropdown trigger.
   */
  open() {
    if (this.disabled) {
      return;
    }

    this.dropdown.open();
  }

  /**
   * Hides the dropdown content
   */
  close() {
    this.dropdown.close();
  }

  _registerCallback(eventType, value) {
    const key = `_on${eventType}`;
    if (this[key]) {
      this.removeEventListener(eventType, this[key]);
    }
    if (typeof value !== 'function') {
      this[key] = null;
      return;
    }
    this[key] = value;
    this.addEventListener(eventType, value);
  }

  _activateHandler() {
    if (this.closeOnActivate) {
      this.close();
    }
  }

  _selectHandler() {
    if (!this.ignoreSelect) {
      this.close();
    }
  }

  _disabledChanged(value, old) {
    super._disabledChanged(value, old);
    if (value && this.opened) {
      this.close();
    }
  }

  _openedChanged(opened, oldOpened) {
    let type;
    if (opened) {
      this._dropdownContent = this.contentElement;
      type = 'dropdown-open';
    } else {
      type = 'dropdown-close';
    }
    this.dispatchEvent(new CustomEvent(type, {
      bubbles: true,
      composed: true
    }));
  }

  __overlayCanceledHandler(e) {
    const uiEvent = e.detail;
    const trigger = this.shadowRoot.querySelector('#trigger');
    const path = uiEvent.path || uiEvent.composedPath();
    if (path.indexOf(trigger) > -1) {
      e.preventDefault();
    }
  }

  render() {
    const {
      opened,
      horizontalAlign,
      verticalAlign,
      dynamicAlign,
      horizontalOffset,
      verticalOffset,
      noOverlap,
      noAnimations,
      allowOutsideScroll,
      restoreFocusOnClose,
      compatibility,
      _dropdownContent
    } = this;
    return html`
    <div id="trigger" @click="${this.toggle}">
      <slot name="dropdown-trigger"></slot>
    </div>

    <anypoint-dropdown
      id="dropdown"
      .opened="${opened}"
      @opened-changed="${this._openedHandler}"
      .horizontalAlign="${ifDefined(horizontalAlign)}"
      .verticalAlign="${ifDefined(verticalAlign)}"
      .horizontalOffset="${ifDefined(horizontalOffset)}"
      .verticalOffset="${ifDefined(verticalOffset)}"
      ?dynamicAlign="${dynamicAlign}"
      ?noOverlap="${noOverlap}"
      ?noAnimations="${noAnimations}"
      .focusTarget="${_dropdownContent}"
      ?allowOutsideScroll="${allowOutsideScroll}"
      ?restoreFocusOnClose="${restoreFocusOnClose}"
      ?compatibility="${compatibility}"
      @overlay-canceled="${this.__overlayCanceledHandler}">
      <div slot="dropdown-content" class="dropdown-content">
        <slot id="content" name="dropdown-content"></slot>
      </div>
    </anypoint-dropdown>
    `;
  }
}
