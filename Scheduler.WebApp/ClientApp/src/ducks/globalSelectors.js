import { appointmentTypes } from "../constants";
import { overlaps } from "../utils/appointments";
import { leaveSelectors } from "./leave";
import {
  jobTaskSelectors,
  resourceJobTaskSelectors,
  workerJobTaskSelectors,
} from "./jobTasks";
import { uiSelectors } from "./ui";
import { trainingSelectors } from "./training";
import { workerTrainingSelectors } from "./workerTraining";
import { workersSelectors } from "./workers";
import { workerConflictsSelectors } from "./workerConflicts";

const selectEventsForWorker = (state, worker, conflicts, start, end) => {
  const jobTaskEvents = workerJobTaskSelectors
    .selectJobTasksByWorker(state, worker.id)
    .map((jobTaskId) => jobTaskSelectors.selectById(state, jobTaskId))
    .map((j) => ({
      id: j.id,
      type: appointmentTypes.JOB_TASK,
      description: j.description,
      start: j.start,
      end: j.end,
      isConflicting: conflicts[appointmentTypes.JOB_TASK].includes(j.id),
    }));

  const leaveEvents = leaveSelectors
    .selectByWorker(state, worker.id)
    .map((l) => ({
      id: l.id,
      type: appointmentTypes.LEAVE,
      description: l.leaveType + " Leave",
      start: l.start,
      end: l.end,
      isConflicting: conflicts[appointmentTypes.LEAVE].includes(l.id),
    }));

  const trainingEvents = workerTrainingSelectors
    .selectTrainingByWorker(state, worker.id)
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
  return { ...worker, schedule: filteredEvents };
};

export const selectCalendarForWorker = (state, id) => {
  const worker = workersSelectors.selectById(state, id);
  const conflicts = workerConflictsSelectors.selectConflictMapForWorker(
    state,
    id
  );
  const { start, end } = uiSelectors.selectPeriod(state);
  return selectEventsForWorker(state, worker, conflicts, start, end);
};

export const selectWorkersCalendar = (state, filter) => {
  let workers;
  if (filter) {
    workers = workersSelectors.selectFiltered(state, filter);
  } else {
    workers = workersSelectors.selectAll(state);
  }

  const conflictsMap = workerConflictsSelectors.selectWorkersConflictMap(state);
  const { start, end } = uiSelectors.selectPeriod(state);

  return workers.map((worker) => {
    const conflicts = conflictsMap[worker.id];
    return selectEventsForWorker(state, worker, conflicts, start, end);
  });
};

export const selectJobTaskWithEntities = (state, id) => {
  if (!id) return undefined;
  const jobTask = jobTaskSelectors.selectById(state, id);
  const workers = workerJobTaskSelectors.selectWorkersByJobTask(state, id);
  const resources = resourceJobTaskSelectors.selectResourcesByJobTask(
    state,
    id
  );
  return { ...jobTask, workers, resources };
};
