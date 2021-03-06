import * as Pages from "./pages";
import ForgotPassword from "./pages/ForgotPassword"
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
      <PrivateRoute path="/profile/edit" component={Pages.ProfileDetails} />
      <PrivateRoute path="/profile/change-password" component={Pages.ChangePassword} />
      <PrivateRoute path="/seed-setup" component={Pages.SeedSetUp} />
      <PrivateRoute path="/dashboard" component={Pages.Dashboard} />
      <Route path="/signin" component={Pages.SignIn} />
      <Route path="/signup" component={Pages.SignUp} />
      <Route path="/resources" component={Pages.Resources} />
      <Route path="/community" component={Pages.ParticipatingSchools} />
      <Route path="/forgot-password" component={Pages.ForgotPassword} />
      <Route path="/verify-email">
        <ForgotPassword title="Verify email"/>
      </Route>
      <Route path="*" component={Pages.PageNotFound} />
    </Switch>
  );
};
export default AppRoutes;
