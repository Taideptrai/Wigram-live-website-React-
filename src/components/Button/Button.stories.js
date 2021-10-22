import Button from './Button.js';

export default {
  title: 'Wigram/Button',
  component: Button,
  parameters: {
    backgrounds: { default: 'light' },
  },
};

const Template = (args) => <Button {...args}>Submit</Button>;

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
};

export const Underlined = Template.bind({});
Underlined.args = {
  type: 'underlined',
};

export const UnderlinedDisabled = Template.bind({});
UnderlinedDisabled.args = {
  type: 'underlined',
  disabled: true,
};
