const { InteractionParser } = require("./index");
const {
  NewInteraction,
  AppendInteraction,
  SupportInteraction,
  AnswerInteraction,
  FundInteraction,
  ResolveInteraction,
} = require("../interactions");

const validNew = "osn:q:1:N:N:1:bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62itye";
const invalid = "osn:q:1:N:N:invalid";
const invalidNewWithInvalidIpfsCid = "osn:q:1:N:N:1:bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62ityp";

const validAppend = "osn:q:1:A:bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62itye:bafybeidzruwvbbhhohll7mif5rbuupkfoeeltjf6bi3meristpx7milt2a";
const validSupport = "osn:q:1:S:N:1:bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62itye";
const validAnswer = "osn:q:1:AS:bafybeibknoqig3k472ke56llloupmlf7g6u6xwxntje4pm2a37npb343n4";
const validFund = "osn:q:1:F:bafybeibknoqig3k472ke56llloupmlf7g6u6xwxntje4pm2a37npb343n4";
const validResolve = "osn:q:1:R:bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62itye";

describe("Spec parser", () => {
  test("parse valid new interaction works", () => {
    const parser = new InteractionParser(validNew);
    expect(parser.isValid).toBeTruthy();
    const interaction = parser.getInteraction();
    expect(interaction).toBeInstanceOf(NewInteraction);
    expect(interaction.topicIpfsCid).toBe("bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62itye");
  });

  test("parse invalid new interaction works", () => {
    const parser = new InteractionParser(invalidNewWithInvalidIpfsCid);
    expect(parser.isValid).toBeFalsy()
  });

  test("parse invalid will throw", () => {
    const parser = new InteractionParser(invalid);
    expect(parser.isValid).toBeFalsy();
    expect(parser.getInteraction).toThrow();
  })

  test("parse valid append interaction works", () => {
    const parser = new InteractionParser(validAppend);
    expect(parser.isValid).toBeTruthy();
    const interaction = parser.getInteraction();
    expect(interaction).toBeInstanceOf(AppendInteraction);
    expect(interaction.topicIpfsCid).toBe("bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62itye");
    expect(interaction.messageIpfsCid).toBe("bafybeidzruwvbbhhohll7mif5rbuupkfoeeltjf6bi3meristpx7milt2a");
  })

  test("parse valid support interaction works", () => {
    const parser = new InteractionParser(validSupport);
    expect(parser.isValid).toBeTruthy();
    const interaction = parser.getInteraction();
    expect(interaction).toBeInstanceOf(SupportInteraction);
    expect(interaction.topicIpfsCid).toBe("bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62itye");
  })

  test("parse valid answer interaction works", () => {
    const parser = new InteractionParser(validAnswer);
    expect(parser.isValid).toBeTruthy();
    const interaction = parser.getInteraction();
    expect(interaction).toBeInstanceOf(AnswerInteraction);
    expect(interaction.answerIpfsCid).toBe("bafybeibknoqig3k472ke56llloupmlf7g6u6xwxntje4pm2a37npb343n4");
  })

  test("parse valid fund interaction works", () => {
    const parser = new InteractionParser(validFund);
    expect(parser.isValid).toBeTruthy();
    const interaction = parser.getInteraction();
    expect(interaction).toBeInstanceOf(FundInteraction);
    expect(interaction.ipfsCid).toBe("bafybeibknoqig3k472ke56llloupmlf7g6u6xwxntje4pm2a37npb343n4");
  })

  test("parse valid resolve interaction works", () => {
    const parser = new InteractionParser(validResolve);
    expect(parser.isValid).toBeTruthy();
    const interaction = parser.getInteraction();
    expect(interaction).toBeInstanceOf(ResolveInteraction);
    expect(interaction.ipfsCid).toBe("bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62itye");
  })
})
