const uniqWith = require("lodash.uniqwith");

function extractMentions(content) {
  const mentions = [];
  const reMention = /\[@[^\]]+\]\(\/network\/(\w+)\/address\/(\w+)\)/g;
  let match;
  while ((match = reMention.exec(content)) !== null) {
    const [, network, address] = match;
    mentions.push({
      network,
      address,
    });
  }

  return uniqWith(
    mentions,
    (a, b) => a.network === b.network && a.address === b.address
  );
}

module.exports = {
  extractMentions,
};
