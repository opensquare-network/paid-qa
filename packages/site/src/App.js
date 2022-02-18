import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Footer } from "qiyisi_test";
// import { Footer } from "ui/lib";
// import { Footer } from "ui/dist";

import Layout from "./components/Layout";
import Header from "./components/Header";
import Main from "./components/Main";
import Home from "./pages/Home";

function App() {
  return (
    <Layout>
      <Header />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </Main>
      <Footer />
    </Layout>
  );
}

export default App;
