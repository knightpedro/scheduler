import React from "react";
import { Tab } from "semantic-ui-react";
import ResourceTasksView from "./ResourceTasksView";
import ResourceOutOfServicesView from "./ResourceOutOfServicesView";

const ResourceEventsView = ({ id }) => {
  const panes = [
    {
      menuItem: "Tasks",
      pane: (
        <Tab.Pane key="tasks" basic attached={false}>
          <ResourceTasksView id={id} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Out of Services",
      pane: (
        <Tab.Pane key="outOfServices" basic attached={false}>
          <ResourceOutOfServicesView id={id} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Tab panes={panes} renderActiveOnly={false}></Tab>
    </>
  );
};

export default ResourceEventsView;
