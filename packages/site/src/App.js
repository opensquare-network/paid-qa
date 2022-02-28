import { HashRouter, Routes, Route } from "react-router-dom";

import { Footer } from "ui/lib";

import Layout from "components/Layout";
import Header from "components/Header";
import Main from "components/Main";
import Home from "pages/Home";
import Question from "pages/Question";
import Profile from "pages/Profile";

function App() {
  return (
    <Layout>
      <Header />
      <Main>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/question" element={<Question />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </HashRouter>
      </Main>
      <Footer />
    </Layout>
  );
}

export default App;
