import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Login } from "./Login";
import { Logout } from "./Logout";
import {
  ApplicationPaths,
  LoginActions,
  LogoutActions,
} from "./ApiAuthorizationConstants";
import AuthorizationMenu from "./AuthorizationMenu";
import { Segment, Divider } from "semantic-ui-react";

export default class ApiAuthorizationRoutes extends Component {
  render() {
    return (
      <>
        <AuthorizationMenu />
        <Divider hidden />
        <Segment basic textAlign="center">
          <Route
            path={ApplicationPaths.Login}
            render={() => loginAction(LoginActions.Login)}
          />
          <Route
            path={ApplicationPaths.LoginFailed}
            render={() => loginAction(LoginActions.LoginFailed)}
          />
          <Route
            path={ApplicationPaths.LoginCallback}
            render={() => loginAction(LoginActions.LoginCallback)}
          />
          <Route
            path={ApplicationPaths.Profile}
            render={() => loginAction(LoginActions.Profile)}
          />
          <Route
            path={ApplicationPaths.Register}
            render={() => loginAction(LoginActions.Register)}
          />
          <Route
            path={ApplicationPaths.LogOut}
            render={() => logoutAction(LogoutActions.Logout)}
          />
          <Route
            path={ApplicationPaths.LogOutCallback}
            render={() => logoutAction(LogoutActions.LogoutCallback)}
          />
          <Route
            path={ApplicationPaths.LoggedOut}
            render={() => logoutAction(LogoutActions.LoggedOut)}
          />
        </Segment>
      </>
    );
  }
}

function loginAction(name) {
  return <Login action={name}></Login>;
}

function logoutAction(name) {
  return <Logout action={name}></Logout>;
}
