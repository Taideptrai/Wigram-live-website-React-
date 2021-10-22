import SectionNav from 'pages/LongformPage/SectionNav/SectionNav';

const NAV_ITEMS = ['Summary', 'Details', 'Chart'];
const NAV_CHART_ITEMS = ['Chart 1', 'Chart 2', 'Chart 3'];

export default {
  title: 'Wigram/Article/SideNav',
  component: SideNav,
  argTypes: {
    inputActiveNav: {
      options: NAV_ITEMS,
      control: { type: 'radio' },
    },
    onNavClick: { action: 'clicked' },
  },
};

const Template = (args) => <SectionNav {...args} />;

export const WhiteText = Template.bind({});
WhiteText.args = {
  opacity: 0,
  inputActiveNav: 'Details',
  navItems: NAV_ITEMS,
  navChartItems: NAV_CHART_ITEMS,
};
WhiteText.parameters = {
  backgrounds: { default: 'dark' },
  layout: 'fullscreen',
};

export const BlackText = Template.bind({});
BlackText.args = {
  opacity: 1,
  navItems: NAV_ITEMS,
};
BlackText.parameters = {
  backgrounds: { default: 'light' },
  layout: 'fullscreen',
};

export const BlackTextWithOpacity = Template.bind({});
BlackTextWithOpacity.args = {
  opacity: 0.25,
  navItems: NAV_ITEMS,
};
BlackTextWithOpacity.parameters = {
  backgrounds: { default: 'light' },
  layout: 'fullscreen',
};
