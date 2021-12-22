import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

import Nav from "./components/Nav";
import NotFound from "./views/NotFound";
import DataContextProvider from "./context";
import { BankInfo, Favorites, Home } from "./views";
import { Sidebar } from "./components";

const App = () => {
  return (
    <Router>
      <DataContextProvider>
        <Nav />
        <main>
          <div className="max-w-6xl mx-auto py-8 sm:px-6 lg:px-8 flex">
            <Sidebar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/bankinfo/:ifsc">
                <BankInfo />
              </Route>
              <Route exact path="/favorites">
                <Favorites />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </main>
      </DataContextProvider>
    </Router>
  );
};

export default App;
