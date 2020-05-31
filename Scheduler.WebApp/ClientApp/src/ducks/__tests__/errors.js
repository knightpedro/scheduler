import errorsReducer, {
  clearAllErrors,
  clearError,
  createErrorsSelector,
} from "../errors";

describe("errors reducer", () => {
  it("has valid initial state", () => {
    const state = errorsReducer(undefined, {});
    expect(state).toEqual({});
  });

  it("adds correct action type to state", () => {
    const error = new Error("Test error");
    const action = { type: "workers/fetchAll/rejected", error };
    const state = errorsReducer(undefined, action);
    expect(state["workers/fetchAll"]).toEqual(
      "Workers fetch all: " + error.message.toLowerCase()
    );
  });

  it("nulls out an error if action does not have error", () => {
    const action = { type: "workers/fetchAll/fulfilled", payload: [] };
    const prevState = { "workers/fetchAll": "Loading failed" };
    const newState = errorsReducer(prevState, action);
    expect(newState["workers/fetchAll"]).toBe(null);
  });

  it("doesn't add action to state if not a request", () => {
    const action = { type: "increment", error: new Error("test") };
    const state = errorsReducer({}, action);
    expect(state[action.type]).toBe(undefined);
  });
});

describe("error actions", () => {
  it("clears a specified error", () => {
    const prevState = {
      "workers/fetchAll": "loading failed",
    };
    const action = clearError("workers/fetchAll");
    const state = errorsReducer(prevState, action);
    expect(state["workers/fetchAll"]).toBe(null);
  });

  it("clears all errors", () => {
    let state = {
      "workers/fetchAll": "error 1",
      "workers/fetchOne": "error 2",
    };
    state = errorsReducer(state, clearAllErrors());
    expect(state).toEqual({});
  });
});

describe("create errors selector", () => {
  it("returns empty array when no matching errors", () => {
    const errors = { testAction: new Error("Test message") };
    const state = { errors };
    const selector = createErrorsSelector(["someOtherAction"]);
    const result = selector(state);
    expect(result).toHaveLength(0);
  });

  it("returns a matching error", () => {
    const testError = new Error("This is a test");
    const state = { errors: { testError: testError.message } };
    const selector = createErrorsSelector(["testError"]);
    const result = selector(state);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(testError.message);
  });

  it("returns all matching errors", () => {
    const errors = {
      test1: "Test Error 1",
      test2: "Test Error 2",
      test3: "Test Error 3",
    };
    const state = { errors };
    const selector = createErrorsSelector(["test1", "test3"]);
    const result = selector(state);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual("Test Error 1");
    expect(result[1]).toEqual("Test Error 3");
  });

  it("ignores null entries", () => {
    const errors = {
      test1: null,
      test2: null,
      test3: "Error",
    };
    const state = { errors };
    const selector = createErrorsSelector(["test1", "test2", "test3"]);
    const result = selector(state);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual("Error");
  });
});
