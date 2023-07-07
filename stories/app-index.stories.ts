import { html, TemplateResult } from 'lit';
import '../src/app-index.js';

export default {
  title: 'AppIndex',
  component: 'app-index',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  header?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ header, backgroundColor = 'white' }: ArgTypes) => html`
  <app-index style="--app-index-background-color: ${backgroundColor}" .header=${header}></app-index>
`;

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
