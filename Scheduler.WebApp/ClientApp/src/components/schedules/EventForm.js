import React from "react";
import { Portal, Segment } from "semantic-ui-react";
import { appointmentTypes } from "../../constants";
import { JobTaskForm, LeaveForm, TrainingForm } from "../forms";

const forms = {
  [appointmentTypes.JOB_TASK]: JobTaskForm,
  [appointmentTypes.LEAVE]: LeaveForm,
  [appointmentTypes.TRAINING]: TrainingForm,
};

const EventForm = ({ eventType, event, ...props }) => {
  const FormComponent = forms[eventType];
  if (!FormComponent) return null;
  return (
    <Portal>
      <Segment>
        <FormComponent values={event} />
      </Segment>
    </Portal>
  );
};

export default EventForm;
