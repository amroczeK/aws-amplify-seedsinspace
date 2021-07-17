import { Route, Switch } from "react-router-dom";
import * as Pages from "./pages";

export const PrivateRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Pages.Home} />
      <Route exact path="/profile" component={Pages.Profile} />
      <Route exact path="/profile-details" component={Pages.ProfileDetails} />
      <Route exact path="/change-password" component={Pages.ChangePassword} />
      <Route exact path="/seed-setup" component={Pages.SeedSetUp} />
      <Route exact path="/dashboard" component={Pages.Dashboard} />
      <Route exact path="/about" component={Pages.Resources} />
      <Route exact path="/schools" component={Pages.ParticipatingSchools} />
      <Route exact path="/faq" component={Pages.Faq} />
      <Route path="*" component={Pages.Home} />
    </Switch>
  );
};

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/signin" component={Pages.SignIn} />
      <Route exact path="/signup" component={Pages.SignUp} />
      <Route exact path="/about" component={Pages.Resources} />
      <Route exact path="/schools" component={Pages.ParticipatingSchools} />
      <Route exact path="/faq" component={Pages.Faq} />
      <Route path="*" component={Pages.SignIn} />
    </Switch>
  );
};
