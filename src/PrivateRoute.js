import { Route, Redirect } from "react-router-dom";
import { useAws } from "./context/AWSContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { cognitoUser } = useAws();

  return (
    <Route
      {...rest}
      render={props =>
        cognitoUser ? (
          <Component {...props} />
        ) : (
          // https://reactrouter.com/web/api/Redirect
          // https://reactrouter.com/web/api/Redirect/to-object
          <Redirect
            to={{
              pathname: "/signin",
              state: { referrer: rest.path },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
