import { overlaps } from "../utils/appointments";
import { leaveSelectors } from "./leave";
import {
  jobTaskSelectors,
  resourceJobTaskSelectors,
  workerJobTaskSelectors,
} from "./jobTasks";
import { uiSelectors } from "./ui";
import { trainingSelectors, workerTrainingSelectors } from "./training";
import { workersSelectors } from "./workers";
import { workerConflictsSelectors } from "./workerConflicts";
import { jobsSelectors } from "./jobs";
import { outOfServiceSelectors } from "./outOfServices";
import { resourcesSelectors } from "./resources";
import { resourceConflictsSelectors } from "./resourceConflicts";

const filterEvents = (events, start, end) =>
  events.filter((e) => {
    if (!(start && end)) return true;
    return overlaps(e, start, end);
  });

const selectEventsForResource = (state, resource, conflicts, start, end) => {
  const jobTaskEvents = resourceJobTaskSelectors.selectEventsForResource(
    state,
    resource.id,
    conflicts
  );
  const outOfServiceEvents = outOfServiceSelectors.selectEventsForResource(
    state,
    resource.id,
    conflicts
  );
  const events = [...jobTaskEvents, ...outOfServiceEvents];
  const filteredEvents = filterEvents(events, start, end);
  return { ...resource, schedule: filteredEvents };
};

const selectEventsForWorker = (state, worker, conflicts, start, end) => {
  const jobTaskEvents = workerJobTaskSelectors.selectEventsForWorker(
    state,
    worker.id,
    conflicts
  );
  const leaveEvents = leaveSelectors.selectEventsForWorker(
    state,
    worker.id,
    conflicts
  );
  const trainingEvents = workerTrainingSelectors.selectEventsForWorker(
    state,
    worker.id,
    conflicts
  );
  const events = [...jobTaskEvents, ...leaveEvents, ...trainingEvents];
  const filteredEvents = filterEvents(events, start, end);
  return { ...worker, schedule: filteredEvents };
};

export const selectCalendarForResource = (state, id) => {
  const resource = resourcesSelectors.selectById(state, id);
  const conflicts = resourceConflictsSelectors.selectConflictMapForResource(
    state,
    id
  );
  const { start, end } = uiSelectors.selectPeriod(state);
  return selectEventsForResource(state, resource, conflicts, start, end);
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

export const selectResourcesCalendar = (state, filter) => {
  let resources;
  if (filter) {
    resources = resourcesSelectors.selectFiltered(state, filter);
  } else {
    resources = resourcesSelectors.selectAll(state);
  }

  const conflictsMap = resourceConflictsSelectors.selectResourcesConflictMap(
    state
  );
  const { start, end } = uiSelectors.selectPeriod(state);

  return resources.map((resource) => {
    const conflicts = conflictsMap[resource.id];
    return selectEventsForResource(state, resource, conflicts, start, end);
  });
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
  const job = jobsSelectors.selectById(state, jobTask.jobId);
  const workers = workerJobTaskSelectors.selectWorkersByJobTask(state, id);
  const resources = resourceJobTaskSelectors.selectResourcesByJobTask(
    state,
    id
  );
  return { ...jobTask, job, workers, resources };
};

export const selectTrainingWithWorkers = (state, id) => {
  if (!id) return undefined;
  const training = trainingSelectors.selectById(state, id);
  const workers = workerTrainingSelectors.selectWorkersByTraining(state, id);
  return { ...training, workers };
};
