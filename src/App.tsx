import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

import Nav from "./components/Nav";
import Home from "./views/Home";
import About from "./views/About";
import NotFound from "./views/NotFound";
import DataContextProvider from "./context";

const App = () => {
  return (
    <DataContextProvider>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </DataContextProvider>
  );
};

export default App;
