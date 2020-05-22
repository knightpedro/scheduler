const createCrudRoutes = (base) => {
  return {
    LIST: `/${base}`,
    DETAIL: `/${base}/:id`,
    CREATE: `/${base}/create`,
    EDIT: `/${base}/edit/:id`,
  };
};

const Routes = {
  home: "/",
  about: "/about",
  coordinators: createCrudRoutes("coordinators"),
  jobs: createCrudRoutes("jobs"),
  jobTasks: createCrudRoutes("tasks"),
  leave: createCrudRoutes("leave"),
  outOfServices: createCrudRoutes("outofservices"),
  reports: "/reports",
  resources: {
    ...createCrudRoutes("resources"),
    SCHEDULE: "/resources/schedule",
  },
  schedules: {
    resources: "/schedule/resources",
  },
  training: createCrudRoutes("training"),
  workers: {
    ...createCrudRoutes("workers"),
    SCHEDULE: "/workers/schedule",
  },
};

export default Routes;
