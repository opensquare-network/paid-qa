const { insertAppendix } = require("../../../../mongo/service/appendix");

async function handleAppend(interaction, caller, indexer) {
  const appendix = {
    caller,
    topicIpfsCid: interaction.topicIpfsCid,
    messageIpfsCid: interaction.messageIpfsCid,
    parsed: false,
    indexer: indexer.toJSON(),
  }

  await insertAppendix(appendix);
}

module.exports = {
  handleAppend,
}
