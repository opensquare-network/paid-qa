import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    </Layout>
  );
}

export default App;
