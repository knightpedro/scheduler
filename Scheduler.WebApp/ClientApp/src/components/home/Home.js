import React from "react";
import { Redirect } from "react-router-dom";
import Routes from "../../routes";

const Home = () => {
    return <Redirect to={Routes.workers.SCHEDULE} />;
};

export default Home;
