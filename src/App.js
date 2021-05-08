import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Dashboard, SignIn, SignUp, SeedSetUp } from "./pages";
import styled from "styled-components";

// import { Header } from "./components/Nav";

const AppContainer = styled.div`
  height: 100vh;
`;

const App = () => {
  return (
    <AppContainer>
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/seed-setup" component={SeedSetUp} />
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </AppContainer>
  );
};

export default App;
