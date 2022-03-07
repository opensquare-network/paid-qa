import Api from "./api";

class ServerApi extends Api {
  async upload(title, content) {
    const { result, error } = await this.fetch(
      "/uploadtoipfs",
      {},
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      }
    );

    return { result, error };
  }
}

export default new ServerApi("/");
