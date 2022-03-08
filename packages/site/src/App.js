import { HashRouter, Routes, Route } from "react-router-dom";

import { Footer } from "ui/lib";

import Layout from "components/Layout";
import Header from "components/Header";
import Main from "components/Main";
import Home from "pages/Home";
import Question from "pages/Question";
import Profile from "pages/Profile";
import AskQuestion from "./pages/AskQuestion";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/askquestion" element={<AskQuestion />} />
            <Route path="/question" element={<Question />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Main>
        <Footer />
      </Layout>
    </HashRouter>
  );
}

export default App;
