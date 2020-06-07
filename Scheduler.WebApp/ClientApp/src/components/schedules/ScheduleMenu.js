import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { useActiveRoute } from "../../utils/hooks";

const ScheduleMenu = () => {
  return (
    <Menu tabular>
      <Menu.Item
        as={Link}
        to={routes.schedules.workers}
        active={useActiveRoute(routes.schedules.workers)}
      >
        Staff
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={routes.schedules.resources}
        active={useActiveRoute(routes.schedules.resources)}
      >
        Plant
      </Menu.Item>
    </Menu>
  );
};

export default ScheduleMenu;
