import { leaveSelectors } from "./leave";
import { resourceJobTaskSelectors, workerJobTaskSelectors } from "./jobTasks";
import { uiSelectors } from "./ui";
import { workerTrainingSelectors } from "./training";
import { workersSelectors } from "./workers";
import { workerConflictsSelectors } from "./workerConflicts";
import { outOfServiceSelectors } from "./outOfServices";
import { resourcesSelectors } from "./resources";
import { resourceConflictsSelectors } from "./resourceConflicts";

const filterEvents = (events, start, end) =>
  events.filter((e) => {
    if (!(start && end)) return true;
    return e.start.isSameOrBefore(end) && e.end.isSameOrAfter(start);
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
  if (!resource) return;
  const conflicts = resourceConflictsSelectors.selectConflictMapForResource(
    state,
    id
  );
  const { start, end } = uiSelectors.selectPeriod(state);
  return selectEventsForResource(state, resource, conflicts, start, end);
};

export const selectCalendarForWorker = (state, id) => {
  const worker = workersSelectors.selectById(state, id);
  if (!worker) return;
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
