import styled from "styled-components";
import { AppNavBar } from "./components/nav";
import AppRoutes from "./AppRoutes";

const AppContainer = styled.div`
  height: 100vh;
`;

const App = () => {
  return (
    <AppContainer>
      <AppNavBar />
      <AppRoutes />
    </AppContainer>
  );
};

export default App;
