import { HashRouter, Routes, Route } from "react-router-dom";

import { Footer } from "@osn/common-ui";

import Layout from "@osn/common-ui/es/styled/Layout";
import Header from "components/Header";
import Main from "@osn/common-ui/es/styled/Main";
import Toast from "components/Toast";
import Home from "pages/Home";
import Topic from "pages/Topic";
import Profile from "pages/Profile";
import NewTopic from "pages/NewTopic";
import FourOFour from "pages/404";
import Notifications from "pages/Notifications";
import ScrollToTop from "./components/ScrollToTop";
import NotificationMonitor from "components/NotificationMonitor";

function App() {
  return (
    <HashRouter>
      <Layout>
        <NotificationMonitor />
        <Header />
        <ScrollToTop />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewTopic />} />
            <Route path="/topic/:cid" element={<Topic />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route
              path="/network/:network/address/:address"
              element={<Profile />}
            />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </Main>
        <Footer />
        <Toast />
      </Layout>
    </HashRouter>
  );
}

export default App;
