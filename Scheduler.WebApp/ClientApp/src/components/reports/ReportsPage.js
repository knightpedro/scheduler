import React from "react";
import Container from "../common/containers";
import OutOfServiceWidget from "./outOfServiceWidget";
import JobsPerformanceContainer from "./JobPerformanceContainer";

const ReportsPage = props => {
    return (
        <Container>
            <h2>Performance</h2>
            <JobsPerformanceContainer />
            <OutOfServiceWidget />
        </Container>
    );
};

export default ReportsPage;
