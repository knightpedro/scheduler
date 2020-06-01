export const createLoadingSelector = (actions) => (state) =>
  actions.some((action) => state.loading[action]);

export const anyLoadingSelector = (state) =>
  Object.keys(state.loading).some((k) => state.loading[k]);

const loadingReducer = (state = {}, action) => {
  const { type } = action;
  const matches = /(.*)[/](pending|fulfilled|rejected)/.exec(type);
  if (!matches) return state;
  const [, request, status] = matches;
  return { ...state, [request]: status === "pending" };
};

export default loadingReducer;
