export function matchMdLink(t) {
  const expression =
    /(?<!\]\()((?:https?|ftp):\/\/[^\s\]\)]*)(?:[\s\]\)](?!\()|$)/gi;
  return t.replace(expression, "[$1]($1) ");
}
