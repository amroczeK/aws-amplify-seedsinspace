import * as Pages from "./pages";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAws } from "./context/AWSContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { cognitoUser } = useAws();

  // https://reactrouter.com/web/api/Redirect
  // https://reactrouter.com/web/api/Redirect/to-object
  return (
    <Route
      {...rest}
      render={props =>
        cognitoUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/signin", state: { referrer: rest.path } }} />
        )
      }
    />
  );
};

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Pages.Home} />
      <PrivateRoute exact path="/profile" component={Pages.Profile} />
      <PrivateRoute exact path="/profile-details" component={Pages.ProfileDetails} />
      <PrivateRoute exact path="/change-password" component={Pages.ChangePassword} />
      <PrivateRoute exact path="/seed-setup" component={Pages.SeedSetUp} />
      <PrivateRoute exact path="/my-seeds" component={Pages.Dashboard} />
      <Route exact path="/signin" component={Pages.SignIn} />
      <Route exact path="/signup" component={Pages.SignUp} />
      <Route exact path="/resources" component={Pages.Resources} />
      <Route exact path="/schools" component={Pages.ParticipatingSchools} />
      <Route exact path="/faq" component={Pages.Faq} />
      <Route path="*" component={Pages.Home} />
    </Switch>
  );
};
export default AppRoutes;
