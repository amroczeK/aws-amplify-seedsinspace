import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, SignIn, SignUp, SeedSetUp } from "./pages";
import styled from "styled-components";
import Header from "./components/nav/Header";

// Context
import { UserContext } from "./components/context/User";

const AppContainer = styled.div`
  height: 100vh;
`;

const App = () => {
  const { loggedIn } = useContext(UserContext);

  return (
    <AppContainer>
      <Router>
        <Header />
        {!loggedIn && (
          <>
            <Switch>
              <Route exact path="/seed-setup" component={SeedSetUp} />
              <Route exact path="/" component={Home} />
            </Switch>
          </>
        )}
        {!loggedIn && (
          <>
            <Switch>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="*" component={SignIn} />
            </Switch>
          </>
        )}
      </Router>
    </AppContainer>
  );
};

export default App;
