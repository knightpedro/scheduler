import React from "react";
import { Tab, Grid } from "semantic-ui-react";
import ResourceTasksView from "./ResourceTasksView";
import ResourceOutOfServicesView from "./ResourceOutOfServicesView";

const ResourceEventsView = ({ id }) => {
  const panes = [
    {
      menuItem: "Out of Services",
      pane: (
        <Tab.Pane key="outOfServices" as={Grid} padded="vertically">
          <Grid.Row columns="equal">
            <Grid.Column>
              <ResourceOutOfServicesView id={id} />
            </Grid.Column>
          </Grid.Row>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Tasks",
      pane: (
        <Tab.Pane key="tasks" as={Grid} padded="vertically">
          <Grid.Row columns="equal">
            <Grid.Column>
              <ResourceTasksView id={id} />
            </Grid.Column>
          </Grid.Row>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Tab
      menu={{ secondary: true, pointing: true }}
      panes={panes}
      renderActiveOnly={false}
    />
  );
};

export default ResourceEventsView;
