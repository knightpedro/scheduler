const createCrudRoutes = base => {
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
    resources: createCrudRoutes("resources"),
    schedules: {
        resources: "/schedule/resources",
        workers: "/schedule/workers",
    },
    training: createCrudRoutes("training"),
    workers: createCrudRoutes("workers"),
};

export default Routes;
