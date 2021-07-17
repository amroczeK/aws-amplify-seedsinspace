import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import * as Pages from "./pages";

// export const PrivateRoutes = () => {
//   return (
//     <Switch>
//       <Route exact path="/dashboard" component={Pages.Dashboard} />
//       <Route exact path="/profile" component={Pages.Profile} />
//       <Route exact path="/seed-setup" component={Pages.SeedSetUp} />
//       <Route exact path="/schools" component={Pages.ParticipatingSchools} />
//       <Route exact path="/faq" component={Pages.Faq} />
//       <Route path="*" component={Pages.Home} />
//     </Switch>
//   );
// };

// export const PublicRoutes = () => {
//   return (
//     <Switch>
//       <Route exact path="/" component={Pages.Home} />
//       <Route exact path="/dashboard" component={Pages.Dashboard} />
//       <Route exact path="/signin" component={Pages.SignIn} />
//       <Route exact path="/signup" component={Pages.SignUp} />
//       <Route exact path="/resources" component={Pages.Resources} />
//       <Route exact path="/schools" component={Pages.ParticipatingSchools} />
//       <Route exact path="/faq" component={Pages.Faq} />
//       <Route path="*" component={Pages.SignIn} />
//     </Switch>
//   );
// };

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Pages.Home} />
      <PrivateRoute exact path="/profile" component={Pages.Profile} />
      <PrivateRoute exact path="/profile-details" component={Pages.ProfileDetails} />
      <PrivateRoute exact path="/change-password" component={Pages.ChangePassword} />
      <PrivateRoute exact path="/seed-setup" component={Pages.SeedSetUp} />
      <PrivateRoute exact path="/dashboard" component={Pages.Dashboard} />
      <Route exact path="/signin" component={Pages.SignIn} />
      <Route exact path="/signup" component={Pages.SignUp} />
      <Route exact path="/resources" component={Pages.Resources} />
      <Route exact path="/schools" component={Pages.ParticipatingSchools} />
      <Route exact path="/faq" component={Pages.Faq} />
      <Route path="*" component={Pages.Home} />
    </Switch>
  );
};
