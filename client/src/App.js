import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import home from "./pages/home";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

const App = () => (
  <Router>
    <div>
      <Wrapper>
        <Route exact path="/" component={home} />
      </Wrapper>
      <Footer />
    </div>
  </Router>
);

export default App;
