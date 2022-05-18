export function replaceMentionLinks(t) {
  const expression = /\[(@[^\]\[]+)\]\((\/network\/\w+\/address\/\w+)\)/g;
  return t.replace(expression, "[$1](/#$2) ");
}
