import { useState } from "react";
import { Link } from "react-router-dom";
import { useAws } from "./context/AWSContext";
import styled from "styled-components";

const PositionedDiv = styled.div`
  position: fixed;
  bottom: 2em;
  left: 2em;
  z-index: 9999;
`;

const ContentDiv = styled.div`
  position: relative;
  background-color: white;
  border: 2px solid black;
  padding: 1em;
  height: 700px;
`;

const PaddedDiv = styled.div`
  padding: 20px 0px;
`;

export default function DevTools() {
  const [hidden, setHidden] = useState(true);
  const { cognitoUser, setCognitoUser } = useAws();

  if (hidden) {
    return (
      <PositionedDiv>
        <button onClick={() => setHidden(!hidden)}>Show Tools</button>
      </PositionedDiv>
    );
  }

  return (
    <PositionedDiv>
      {hidden && <button onClick={() => setHidden(!hidden)}>Show Tools</button>}
      {!hidden && (
        <ContentDiv>
          <h3 style={{ padding: "1em", backgroundColor: "lightBlue" }}>SiS Dev Tools</h3>
          <button
            style={{ padding: "1em", position: "absolute", top: "24px", right: "24px" }}
            onClick={() => setHidden(!hidden)}
          >
            Hide Tools
          </button>
          <PaddedDiv>
            <button
              style={{ marginRight: "1em" }}
              onClick={() => setCognitoUser(!cognitoUser)}
            >
              ToggleLogin
            </button>
            Logged in? {cognitoUser ? "True" : "False"}
          </PaddedDiv>
          <RouteShortcuts />
        </ContentDiv>
      )}
    </PositionedDiv>
  );
}

const RouteShortcuts = () => (
  <PaddedDiv>
    Routes - Change login to see more
    <nav>
      <ul style={{ listStyleType: "none" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
        <li>
          <Link to="/schools">Schools</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
        <li>
          <Link to="/seed-setup">Seed Setup</Link>
        </li>
        <li>
          <Link to="/my-seeds">My Seeds</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  </PaddedDiv>
);
