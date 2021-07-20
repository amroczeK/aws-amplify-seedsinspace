import styled from "styled-components";
import { AppNavBar } from "./components/nav";
import AppRoutes from "./AppRoutes";
import DevTools from "./DevTools";

const AppContainer = styled.div`
  height: 100vh;
`;

const App = () => {
  return (
    <AppContainer>
      <AppNavBar />
      <DevTools />
      <AppRoutes />
    </AppContainer>
  );
};

export default App;
