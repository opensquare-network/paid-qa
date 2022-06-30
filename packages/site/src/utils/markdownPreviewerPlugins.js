export function maxLinePlugin(line = 3) {
  return {
    name: "max-line",

    collectCss(css) {
      return css`
        display: -webkit-box;
        -webkit-line-clamp: ${line};
        -webkit-box-orient: vertical;
        overflow: hidden;
      `;
    },
  };
}
