import React from "react";
import { HashRouter  as Router, Switch, Route } from "react-router-dom";
import { Home  , Favorites } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";

const AppRouter = () => {
  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch> 
          <Route exact path="/PplFinder/favorites/" component={Favorites} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;