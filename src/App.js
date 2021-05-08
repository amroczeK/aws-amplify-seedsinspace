import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Dashboard, SignIn } from "./pages";
import { Header } from "./components/Nav";

import styled from "styled-components";

const AppContainer = styled.div`
  height: 100vh;
`;

const App = () => {
  return (
    <AppContainer>
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
        {/* <Footer />         */}
      </Router>
    </AppContainer>
  );
};

export default App;
