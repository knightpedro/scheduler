import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react";
import { LoginMenu } from "../api-authorization/LoginMenu";
import routes from "../../routes";
import { useActiveRoute } from "../../utils/hooks";

const MainMenu = () => {
  return (
    <Menu stackable>
      <Menu.Item
        as={Link}
        to={routes.schedules.base}
        active={useActiveRoute(routes.schedules.base)}
      >
        Planner
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={routes.jobs.list}
        active={useActiveRoute(routes.jobs.list)}
      >
        Jobs
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={routes.reports}
        active={useActiveRoute(routes.reports)}
      >
        Reports
      </Menu.Item>
      <Menu.Item as={Dropdown} text="Administration" className="link item">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={routes.coordinators.list}>
            Coordinators
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={routes.resources.list}>
            Resources
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={routes.workers.list}>
            Staff
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={routes.training.list}>
            Training
          </Dropdown.Item>
        </Dropdown.Menu>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item
          as={Link}
          to={routes.about}
          active={useActiveRoute(routes.about)}
        >
          About
        </Menu.Item>
        <LoginMenu />
      </Menu.Menu>
    </Menu>
  );
};

export default MainMenu;
