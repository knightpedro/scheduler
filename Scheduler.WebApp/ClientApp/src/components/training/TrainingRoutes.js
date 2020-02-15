import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateTrainingForm from "./createTrainingForm";
import EditTrainingForm from "./editTrainingForm";
import TrainingList from "./trainingList";
import TrainingDetail from "./trainingDetail";
import Routes from "../../routes";

const TrainingRoutes = () => {
    let { CREATE, DETAIL, EDIT, LIST } = Routes.training;
    return (
        <Switch>
            <Route path={CREATE} component={CreateTrainingForm} />
            <Route path={EDIT} component={EditTrainingForm} />
            <Route path={DETAIL} component={TrainingDetail} />
            <Route path={LIST} component={TrainingList} />
        </Switch>
    );
};

export default TrainingRoutes;
