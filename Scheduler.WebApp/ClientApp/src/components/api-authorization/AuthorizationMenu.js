import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { LoginMenu } from "../api-authorization/LoginMenu";

const AuthorizationMenu = () => {
  return (
    <Menu stackable borderless attached="top">
      <Menu.Item header>Scheduler</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item
          as="a"
          href="https://github.com/knightpedro/scheduler"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="github" />
          GitHub
        </Menu.Item>
        <LoginMenu />
      </Menu.Menu>
    </Menu>
  );
};

export default AuthorizationMenu;
