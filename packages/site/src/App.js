import { HashRouter, Routes, Route } from "react-router-dom";

import { Footer } from "@osn/common-ui/lib";

import Layout from "@osn/common-ui/lib/styled/Layout";
import Header from "components/Header";
import Main from "@osn/common-ui/lib/styled/Main";
import Toast from "components/Toast";
import Home from "pages/Home";
import Topic from "pages/Topic";
import Profile from "pages/Profile";
import NewTopic from "pages/NewTopic";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewTopic />} />
            <Route path="/topic/:cid" element={<Topic />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Main>
        <Footer />
        <Toast />
      </Layout>
    </HashRouter>
  );
}

export default App;
