import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "./components/context/User";
import { AppNavBar } from "./components/nav";
import { PrivateRoutes, PublicRoutes } from "./AppRoutes";
import DevTools from "./DevTools";

const AppContainer = styled.div`
  height: 100vh;
`;

const App = () => {
  const { loggedIn } = useContext(UserContext);

  return (
    <AppContainer>
      <AppNavBar />
      <DevTools />
      {loggedIn && <PrivateRoutes />}
      {!loggedIn && <PublicRoutes />}
    </AppContainer>
  );
};

export default App;
