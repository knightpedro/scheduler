import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import LoadingIndicator from "./LoadingIndicator";
import { LoginMenu } from "../api-authorization/LoginMenu";
import routes from "../../routes";
import { useActiveRoute } from "../../utils/hooks";
import { anyLoadingSelector } from "../../ducks/loading";
import { useSelector } from "react-redux";
import styled from "styled-components";

const LoadingStyles = styled.div`
  height: 1rem;
`;

const MainMenu = () => {
  const loading = useSelector(anyLoadingSelector);
  return (
    <>
      <Menu stackable borderless attached="top">
        <Menu.Item
          as={Dropdown}
          text="Planner"
          className="link item"
          active={useActiveRoute(routes.schedules.base)}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to={routes.schedules.workers}
              active={useActiveRoute(routes.schedules.workers)}
            >
              Staff
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to={routes.schedules.resources}
              active={useActiveRoute(routes.schedules.resources)}
            >
              Plant
            </Dropdown.Item>
          </Dropdown.Menu>
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={routes.jobs.base}
          active={useActiveRoute(routes.jobs.base)}
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
            <Dropdown.Item as={Link} to={routes.coordinators.base}>
              Coordinators
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={routes.resources.base}>
              Plant
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={routes.workers.base}>
              Staff
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={routes.training.base}>
              Training
            </Dropdown.Item>
          </Dropdown.Menu>
        </Menu.Item>
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
      <LoadingStyles>
        {loading && <LoadingIndicator attached="bottom" />}
      </LoadingStyles>
    </>
  );
};

export default MainMenu;
