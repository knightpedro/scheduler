import { appointmentTypes } from "../constants";
import { overlaps } from "../utils/appointments";
import { leaveSelectors } from "./leave";
import { jobTaskSelectors } from "./jobTasks";
import { uiSelectors } from "./ui";
import { workerJobTaskSelectors } from "./workerJobTasks";
import { trainingSelectors } from "./training";
import { workerTrainingSelectors } from "./workerTraining";
import { workersSelectors } from "./workers";
import { workerConflictsSelectors } from "./workerConflicts";

export const selectWorkersCalendar = (state) => {
  const workers = workersSelectors.selectAll(state);
  const conflictsMap = workerConflictsSelectors.selectConflictEventMap(state);
  const { start, end } = uiSelectors.selectPeriod(state);

  return workers.map((w) => {
    const conflicts = conflictsMap[w.id];
    const jobTaskEvents = workerJobTaskSelectors
      .selectJobTasksByWorker(state, w.id)
      .map((jobTaskId) => jobTaskSelectors.selectById(state, jobTaskId))
      .map((j) => ({
        id: j.id,
        type: appointmentTypes.JOB_TASK,
        description: j.description,
        start: j.start,
        end: j.end,
        isConflicting: conflicts[appointmentTypes.JOB_TASK].includes(j.id),
      }));

    const leaveEvents = leaveSelectors.selectByWorker(state, w.id).map((l) => ({
      id: l.id,
      type: appointmentTypes.LEAVE,
      description: l.leaveType,
      start: l.start,
      end: l.end,
      isConflicting: conflicts[appointmentTypes.LEAVE].includes(l.id),
    }));

    const trainingEvents = workerTrainingSelectors
      .selectTrainingByWorker(state, w.id)
      .map((trainingId) => trainingSelectors.selectById(state, trainingId))
      .map((t) => ({
        id: t.id,
        type: appointmentTypes.TRAINING,
        description: t.description,
        start: t.start,
        end: t.end,
        isConflicting: conflicts[appointmentTypes.TRAINING].includes(t.id),
      }));

    const events = [...jobTaskEvents, ...leaveEvents, ...trainingEvents];
    const filteredEvents = events.filter((e) => {
      if (!(start && end)) return true;
      return overlaps(e, start, end);
    });
    return {
      ...w,
      schedule: filteredEvents,
    };
  });
};
