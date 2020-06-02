import reducer, { assignWorkers } from "../workerTraining";
import { deleteTraining } from "../training";
import { deleteWorker } from "../workers";

describe("workerTraining reducer", () => {
  it("has empty array as initial state", () => {
    const state = reducer(undefined, { type: "testAction" });
    expect(state).toEqual([]);
  });

  it("adds worker training", () => {
    const action = assignWorkers.fulfilled({
      trainingId: 1,
      add: [2],
      remove: [],
    });
    const state = reducer(undefined, action);
    expect(state).toHaveLength(1);
    expect(state[0]).toEqual({ trainingId: 1, workerId: 2 });
  });

  it("removes worker training", () => {
    const action = assignWorkers.fulfilled({
      trainingId: 1,
      add: [],
      remove: [2],
    });
    const initialState = [{ trainingId: 1, workerId: 2 }];
    const newState = reducer(initialState, action);
    expect(newState).toHaveLength(0);
  });

  it("removes worker training associated with a deleted worker", () => {
    const action = deleteWorker.fulfilled(1);
    const initialState = [{ trainingId: 2, workerId: 1 }];
    const newState = reducer(initialState, action);
    expect(newState).toHaveLength(0);
  });

  it("removes all worker training associated with deleted training", () => {
    const action = deleteTraining.fulfilled(1);
    const initialState = [
      { trainingId: 1, workerId: 1 },
      { trainingId: 1, workerId: 2 },
      { trainingId: 2, workerId: 3 },
    ];
    const newState = reducer(initialState, action);
    expect(newState).toHaveLength(1);
    expect(newState[0]).toEqual({ trainingId: 2, workerId: 3 });
  });
});
