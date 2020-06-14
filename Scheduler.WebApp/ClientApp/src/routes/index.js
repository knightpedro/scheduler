const createCrudRoutes = (base) => {
  return {
    base: `/${base}`,
    list: `/${base}/:id?`,
    detail: `/${base}/:id`,
    create: `/${base}/create`,
  };
};

const routes = {
  home: "/",
  about: "/about",
  coordinators: createCrudRoutes("coordinators"),
  jobs: createCrudRoutes("jobs"),
  plant: createCrudRoutes("plant"),
  reports: "/reports",
  resources: createCrudRoutes("resources"),
  schedules: {
    base: "/schedule",
    resources: "/schedule/resources",
    workers: "/schedule/workers",
  },
  training: createCrudRoutes("training"),
  workers: createCrudRoutes("workers"),
};

export default routes;
