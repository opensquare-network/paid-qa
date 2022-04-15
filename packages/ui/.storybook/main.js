module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  // https://github.com/storybookjs/storybook/issues/6188#issuecomment-822924831
  babel: (options) => {
    options.plugins.push("babel-plugin-inline-react-svg");
    return options;
  },
};
