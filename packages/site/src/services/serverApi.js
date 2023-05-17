import Api from "@osn/common/services/api";

class ServerApi extends Api {}

const serverApi = new ServerApi(import.meta.env.VITE_APP_QA_API_SERVER);

export default serverApi;
