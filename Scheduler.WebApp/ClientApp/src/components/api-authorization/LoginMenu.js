import React, { Component } from "react";
import { Link } from "react-router-dom";
import authService from "./AuthorizeService";
import { ApplicationPaths } from "./ApiAuthorizationConstants";
import { Menu, Icon } from "semantic-ui-react";

export class LoginMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null,
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser(),
    ]);
    this.setState({
      isAuthenticated,
      userName: user && user.name,
    });
  }

  render() {
    const { isAuthenticated, userName } = this.state;
    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return this.anonymousView(registerPath, loginPath);
    } else {
      const profilePath = `${ApplicationPaths.Profile}`;
      const logoutPath = {
        pathname: `${ApplicationPaths.LogOut}`,
        state: { local: true },
      };
      return this.authenticatedView(userName, profilePath, logoutPath);
    }
  }

  authenticatedView(userName, profilePath, logoutPath) {
    return (
      <>
        <Menu.Item as={Link} to={profilePath}>
          <Icon name="user circle" />
          {userName}
        </Menu.Item>
        <Menu.Item as={Link} to={logoutPath}>
          Logout
        </Menu.Item>
      </>
    );
  }

  anonymousView(registerPath, loginPath) {
    return (
      <>
        <Menu.Item as={Link} to={loginPath}>
          Login
        </Menu.Item>
        <Menu.Item as={Link} to={registerPath}>
          Register
        </Menu.Item>
      </>
    );
  }
}
