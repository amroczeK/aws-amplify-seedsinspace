import styled from "styled-components";
import { useAws } from "./context/AWSContext";
import { AppNavBar } from "./components/nav";
import { PrivateRoutes, PublicRoutes } from "./AppRoutes";
import DevTools from "./DevTools";

const AppContainer = styled.div`
  height: 100vh;
`;

const App = () => {
  const { cognitoUser } = useAws();

  return (
    <AppContainer>
      <AppNavBar />
      <DevTools />
      {cognitoUser && <PrivateRoutes />}
      {!cognitoUser && <PublicRoutes />}
    </AppContainer>
  );
};

export default App;
