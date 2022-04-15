import Api from "@osn/common/services/api";

class ServerApi extends Api {}

export default new ServerApi(process.env.REACT_APP_QA_API_SERVER);
