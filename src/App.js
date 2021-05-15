import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { theme } from "./theme";
import { Base } from "./components";
import { Home, Dashboard } from "./pages";
import { Header, Footer } from "./components/Nav";
import DatePicker from "./components/DatePicker/DatePicker";

const App = () => {
  const { loggedIn } = useContext(UserContext);

  return (
    <AppContainer>
      <Router>
        <Header />
        {loggedIn && (
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
