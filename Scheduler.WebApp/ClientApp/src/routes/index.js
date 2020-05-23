const createCrudRoutes = (base) => {
  return {
    list: `/${base}`,
    detail: `/${base}/:id`,
    create: `/${base}/create`,
    edit: `/${base}/edit/:id`,
  };
};

const routes = {
  home: "/",
  about: "/about",
  coordinators: createCrudRoutes("coordinators"),
  jobs: createCrudRoutes("jobs"),
  jobTasks: createCrudRoutes("tasks"),
  leave: createCrudRoutes("leave"),
  outOfServices: createCrudRoutes("outofservices"),
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
