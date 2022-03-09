import { HashRouter, Routes, Route } from "react-router-dom";

import { Footer } from "ui/lib";

import Layout from "components/Layout";
import Header from "components/Header";
import Main from "components/Main";
import Home from "pages/Home";
import Topic from "pages/Topic";
import Profile from "pages/Profile";
import NewTopic from "./pages/NewTopic";

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
      </Layout>
    </HashRouter>
  );
}

export default App;
