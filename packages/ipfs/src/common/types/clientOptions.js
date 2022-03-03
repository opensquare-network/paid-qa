class ClientOptions {
  #infuraProjectId;
  #infuraProjectSecret;
  #localNodeIpOrUrl;

  constructor(infuraProjectId, infuraProjectSecret, localNodeIpOrUrl) {
    this.#infuraProjectId = infuraProjectId;
    this.#infuraProjectSecret = infuraProjectSecret;
    this.#localNodeIpOrUrl = localNodeIpOrUrl;
  }

  get infuraProjectId() {
    return this.#infuraProjectId;
  }

  get infuraProjectSecret() {
    return this.#infuraProjectSecret;
  }

  get localNodeIpOrUrl() {
    return this.#localNodeIpOrUrl;
  }
}

module.exports = {
  ClientOptions,
}
