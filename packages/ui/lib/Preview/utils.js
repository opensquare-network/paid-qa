export function matchMdLink(t) {
  const expression =
    /(?!]\()((?:https?|ftp):\/\/[^\s\])]*)(?:[\s\])](?!\()|$)/gi;
  return t.replace(expression, "[$1]($1) ");
}

export function replaceMentionLinks(t) {
  const expression = /\[(@[^\]\[]+)]\((\/network\/\w+\/address\/\w+)\)/g;
  return t.replace(expression, "[$1](/#$2) ");
}
