import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";
import * as Pages from "./pages";
import { AppNavBar } from "./components/nav";
import { UserContext } from "./components/context/User";
import DevTools from "./DevTools";
const AppContainer = styled.div`
  height: 100vh;
`;

const ConditionalRoute = ({ component: Component, condition, redirect, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      condition ? <Component {...props} /> : <Redirect to={redirect || "/signin"} />
    }
  />
);

const App = () => {
  const { loggedIn } = useContext(UserContext);

  return (
    <AppContainer>
      <BrowserRouter>
        <AppNavBar />
        <DevTools />
        <Switch>
          <ConditionalRoute exact path="/" condition={loggedIn} component={Pages.Home} />
          <ConditionalRoute
            path="/seed-setup"
            condition={loggedIn}
            component={Pages.SeedSetUp}
          />
          <ConditionalRoute
            path="/dashboard"
            condition={loggedIn}
            component={Pages.Dashboard}
          />
          <ConditionalRoute
            path="/signin"
            condition={!loggedIn}
            component={Pages.SignIn}
            auth={loggedIn}
            redirect="/"
          />
          <ConditionalRoute
            path="/signup"
            condition={!loggedIn}
            component={Pages.SignUp}
            redirect="/"
          />
          <Route path="/about" component={Pages.AboutUs} />
          <Route path="/schools" component={Pages.ParticipatingSchools} />
          <Route path="/faq" component={Pages.Faq} />
          <Route path="*" component={Pages.SignIn} />
        </Switch>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
