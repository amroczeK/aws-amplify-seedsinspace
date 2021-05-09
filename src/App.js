import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, SignIn, SignUp, SeedSetUp } from "./pages";
import styled from "styled-components";
import { UserNav } from "./components/Nav/UserNav";
import { PublicNav } from "./components/Nav/PublicNav";

const AppContainer = styled.div`
  height: 100vh;
`;

const App = () => {
  // Put this somewhere else like in context
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AppContainer>
      {loggedIn && (
        <div>
          <UserNav />
          <Router>
            <Switch>
              <Route exact path="/seed-setup" component={SeedSetUp} />
              <Route exact path="/" component={Home} />
            </Switch>
          </Router>
        </div>
      )}
      {!loggedIn && (
        <div>
          <PublicNav />
          <Router>
            <Switch>
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/" component={<div>Public Home</div>} />
            </Switch>
          </Router>
        </div>
      )}
    </AppContainer>
  );
};

export default App;
