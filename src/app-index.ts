
import '../assets/styles.css';
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('app-index')
export class AppIndex extends LitElement {
  @property({ type: String }) header = 'My app';

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--app-index-background-color);
    }

    main {
      flex-grow: 1;

      & {
        color: red;
      }
    }
  `;

  createRenderRoot() {
    return this; // turn off shadow dom to access external styles
  }

  render() {
    return html`
      <main>
        <h1 class=" my-4 bg-amber-500">laurenz.dev</h1>

      </main>
    `;
  }
}
