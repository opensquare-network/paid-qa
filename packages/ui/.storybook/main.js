module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  staticDirs: [
    // make `site` as public folder for storybook
    // used in `preview-head.html`
    {
      from: "../../site/public",
      to: "/public",
    },
    {
      from: "../../site/src/index.css",
      to: "/src/index.css",
    },
    // used in 'Preview/MicromarkMd'
    {
      from: "../../site/public/prism.js",
      to: "/prism.js",
    },
    {
      from: "../../site/public/prism.css",
      to: "/prism.css",
    },
  ],
  framework: "@storybook/react",
  // https://github.com/storybookjs/storybook/issues/6188#issuecomment-822924831
  babel: (options) => {
    options.plugins.push("babel-plugin-inline-react-svg");
    return options;
  },
};
