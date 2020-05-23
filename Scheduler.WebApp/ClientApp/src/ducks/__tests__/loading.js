import loadingReducer, { createLoadingSelector } from "../loading";

describe("loading reducer", () => {
  it("sets actionType to true on pending", () => {
    const action = { type: "workers/fetchAll/pending" };
    const state = loadingReducer({}, action);
    expect(state["workers/fetchAll"]).toBe(true);
  });

  it("only sets actionType to true on pending", () => {
    const action = { type: "workers/fetchAll/fulfilled" };
    const state = loadingReducer({}, action);
    expect(state["workers/fetchAll"]).toBe(false);
  });

  it("changes state from true to false on rejection", () => {
    const action = { type: "workers/fetchAll/rejected" };
    let state = { "workers/fetchAll": true };
    state = loadingReducer(state, action);
    expect(state["workers/fetchAll"]).toBe(false);
  });
});

describe("create loading selector", () => {
  it("is true if any of the action types are loading", () => {
    const selector = createLoadingSelector([
      "workers/fetchAll",
      "workers/fetchOne",
    ]);
    const loading = { "workers/fetchAll": false, "workers/fetchOne": true };
    const state = { loading };
    const result = selector(state);
    expect(result).toBe(true);
  });

  it("is false if none of the action types are loading", () => {
    const selector = createLoadingSelector([
      "workers/fetchAll",
      "workers/fetchOne",
    ]);
    const loading = { "workers/fetchAll": false };
    const state = { loading };
    const result = selector(state);
    expect(result).toBe(false);
  });
});
