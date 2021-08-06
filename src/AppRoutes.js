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
      <Route exact path="/" component={Pages.About} />
      <PrivateRoute exact path="/profile" component={Pages.Profile} />
      <PrivateRoute exact path="/profile-details" component={Pages.ProfileDetails} />
      <PrivateRoute exact path="/change-password" component={Pages.ChangePassword} />
      <PrivateRoute exact path="/seed-setup" component={Pages.SeedSetUp} />
      <PrivateRoute exact path="/dashboard" component={Pages.Dashboard} />
      <PrivateRoute exact path="/all-seeds" component={Pages.AllSeeds} />
      <Route exact path="/signin" component={Pages.SignIn} />
      <Route exact path="/signup" component={Pages.SignUp} />
      <Route exact path="/resources" component={Pages.Resources} />
      <Route exact path="/community" component={Pages.ParticipatingSchools} />
      <Route path="*" component={Pages.About} />
    </Switch>
  );
};
export default AppRoutes;
