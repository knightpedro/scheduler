const formatRequest = (request) => {
  const [feature, requestType] = request.split("/");
  if (!(feature && requestType)) return request;
  const requestDescriptor = requestType
    .split(/(?=[A-Z])/)
    .join(" ")
    .toLowerCase();
  return `${requestDescriptor} ${feature}`;
};

const requestsReducer = (state = { request: null, status: null }, action) => {
  const { type } = action;
  const matches = /(.*)[/](pending|fulfilled|rejected)/.exec(type);
  if (!matches) return state;
  const [, request, status] = matches;
  return {
    request: formatRequest(request),
    status,
  };
};

export default requestsReducer;
