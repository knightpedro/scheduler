import {
  JobTaskFormContainer,
  LeaveFormContainer,
  OutOfServiceFormContainer,
  TrainingFormContainer,
} from "../forms/containers";
import { appointmentTypes } from "../../constants";

export default {
  [appointmentTypes.JOB_TASK]: JobTaskFormContainer,
  [appointmentTypes.LEAVE]: LeaveFormContainer,
  [appointmentTypes.OUT_OF_SERVICE]: OutOfServiceFormContainer,
  [appointmentTypes.TRAINING]: TrainingFormContainer,
};
