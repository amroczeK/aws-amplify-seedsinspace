import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Pages from "./pages";
import DeveloperTools from "./DeveloperTools";
import styled from "styled-components";
import { AppNavBar } from "./components/nav";
import { UserContext } from "./components/context/User";

const AppContainer = styled.div`
  height: 100vh;
`;

const App = () => {
  const { loggedIn } = useContext(UserContext);
  console.log(loggedIn);

  return (
    <AppContainer>
      <Router>
        <DeveloperTools />
        <AppNavBar />
        {loggedIn && (
          <>
            <Switch>
              <Route exact path="/seed-setup" component={Pages.SeedSetUp} />
              <Route exact path="/dashboard" component={Pages.Dashboard} />
              <Route exact path="/" component={Pages.Home} />
            </Switch>
          </>
        )}
        {!loggedIn && (
          <>
            <Switch>
              <Route exact path="/signin" component={Pages.SignIn} />
              <Route exact path="/signup" component={Pages.SignUp} />
              <Route exact path="/about" component={Pages.AboutUs} />
              <Route exact path="/schools" component={Pages.ParticipatingSchools} />
              <Route exact path="/faq" component={Pages.Faq} />

              <Route exact path="*" component={Pages.SignIn} />
            </Switch>
          </>
        )}
      </Router>
    </AppContainer>

  );
};

export default App;
