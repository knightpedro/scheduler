import { fetchAll } from "../sharedActions";
import { appointmentTypes } from "../../constants";
import reducer, {
  workerConflictsSelectors as selectors,
  workerConflictsAdapter as adapter,
  shapeConflictsByType,
} from "../workerConflicts";

const noConflictsResponse = [
  { id: 1, conflicts: [] },
  { id: 2, conflicts: [] },
  { id: 3, conflicts: [] },
];

const conflictsResponse = [
  { id: 1, conflicts: [] },
  {
    id: 2,
    conflicts: [
      {
        eventA: {
          id: 25,
          type: "Training",
        },
        eventB: {
          id: 26,
          type: "Training",
        },
        start: "2020-01-25T19:00:00.0000000Z",
        end: "2020-01-26T03:00:00.0000000Z",
      },
    ],
  },
  { id: 3, conflicts: [] },
];

describe("worker conflicts", () => {
  const initialState = adapter.getInitialState();

  describe("reducer", () => {
    it("handles fetch all with no conflicts", () => {
      const action = fetchAll.fulfilled({ workerConflicts: [] });
      const state = reducer(initialState, action);
      expect(state).toEqual(initialState);
    });

    it("handles fetch all with conflicts", () => {
      const action = fetchAll.fulfilled({ workerConflicts: conflictsResponse });
      const state = reducer(initialState, action);
      expect(state.ids).toHaveLength(3);
      expect(state.entities[2].conflicts).toHaveLength(1);
    });
  });

  describe("selectConflictMapForWorker", () => {
    it("selects empty lists for worker with no conflicts", () => {
      const action = fetchAll.fulfilled({ workerConflicts: conflictsResponse });
      const state = reducer(initialState, action);
      const globalState = { workerConflicts: state };
      const map = selectors.selectConflictMapForWorker(globalState, 1);
      expect(map[appointmentTypes.JOB_TASK]).toHaveLength(0);
      expect(map[appointmentTypes.LEAVE]).toHaveLength(0);
      expect(map[appointmentTypes.TRAINING]).toHaveLength(0);
    });

    it("selects correct map for worker with conflicts", () => {
      const action = fetchAll.fulfilled({ workerConflicts: conflictsResponse });
      const state = reducer(initialState, action);
      const globalState = { workerConflicts: state };
      const map = selectors.selectConflictMapForWorker(globalState, 2);
      expect(map[appointmentTypes.JOB_TASK]).toHaveLength(0);
      expect(map[appointmentTypes.LEAVE]).toHaveLength(0);
      expect(map[appointmentTypes.TRAINING]).toHaveLength(2);
      expect(map[appointmentTypes.TRAINING]).toContain(25);
      expect(map[appointmentTypes.TRAINING]).toContain(26);
    });
  });

  describe("selectWorkersConflictMap", () => {
    it("selects correct map when no conflicts", () => {
      const action = fetchAll.fulfilled({
        workerConflicts: noConflictsResponse,
      });
      const state = reducer(initialState, action);
      const globalState = { workerConflicts: state };
      const map = selectors.selectWorkersConflictMap(globalState);

      expect(Object.keys(map)).toHaveLength(3);
      expect(map[1][appointmentTypes.JOB_TASK]).toHaveLength(0);
      expect(map[1][appointmentTypes.LEAVE]).toHaveLength(0);
      expect(map[1][appointmentTypes.TRAINING]).toHaveLength(0);

      expect(map[2][appointmentTypes.JOB_TASK]).toHaveLength(0);
      expect(map[2][appointmentTypes.LEAVE]).toHaveLength(0);
      expect(map[2][appointmentTypes.TRAINING]).toHaveLength(0);
    });

    it("selects correct map with conflicts", () => {
      const action = fetchAll.fulfilled({
        workerConflicts: conflictsResponse,
      });
      const state = reducer(initialState, action);
      const globalState = { workerConflicts: state };
      const map = selectors.selectWorkersConflictMap(globalState);

      expect(Object.keys(map)).toHaveLength(3);
      expect(map[1][appointmentTypes.JOB_TASK]).toHaveLength(0);
      expect(map[1][appointmentTypes.LEAVE]).toHaveLength(0);
      expect(map[1][appointmentTypes.TRAINING]).toHaveLength(0);

      expect(map[2][appointmentTypes.JOB_TASK]).toHaveLength(0);
      expect(map[2][appointmentTypes.LEAVE]).toHaveLength(0);
      expect(map[2][appointmentTypes.TRAINING]).toHaveLength(2);
    });
  });

  describe("shapeConflictMapForWorker", () => {
    it("returns empty map for worker with no conflicts", () => {
      const worker = { id: 1, conflicts: [] };
      const map = shapeConflictsByType(worker);
      expect(map[appointmentTypes.JOB_TASK]).toHaveLength(0);
      expect(map[appointmentTypes.LEAVE]).toHaveLength(0);
      expect(map[appointmentTypes.TRAINING]).toHaveLength(0);
    });
  });
});
