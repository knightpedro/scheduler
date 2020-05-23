import { useLocation, matchPath } from "react-router-dom";

export const useActiveRoute = (route) => {
  const location = useLocation();
  const path = { path: route };
  return matchPath(location.pathname, path) !== null;
};
