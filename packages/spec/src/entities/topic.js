class Topic {
  #title;
  #content;

  constructor(title, content) {
    this.#title = title;
    this.#content = content;
  }

  get title() {
    return this.#title;
  }

  get content() {
    return this.#content;
  }
}

module.exports = {
  Topic,
}
