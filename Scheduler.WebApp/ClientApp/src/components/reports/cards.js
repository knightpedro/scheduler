import React from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronUp,
    faChevronDown,
    faMinus,
} from "@fortawesome/free-solid-svg-icons";

const Kpi = styled.div`
    font-size: 64px;
    font-weight: bold;
    color: #1d2e81;
    text-align: end;
`;

const KpiText = styled.div`
    font-size: 24px;
    text-align: start;
`;

const KpiIndicator = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: ${props =>
        props.change > 0 ? "green" : props.change < 0 ? "red" : "gray"};
`;

export const JobsInProgressCard = ({ jobsCount }) => {
    return (
        <Card className="shadow mt-4">
            <div className="row align-items-center">
                <Kpi className="col-3">{jobsCount}</Kpi>
                <KpiText className="col-9">Jobs in progess</KpiText>
            </div>
        </Card>
    );
};

export const JobsReceivedCard = ({ currentCount, previousCount }) => {
    const change = currentCount - previousCount;
    return (
        <Card className="shadow mt-4">
            <div className="row align-items-center">
                <Kpi className="col-3">{currentCount}</Kpi>
                <KpiText className="col-6">
                    Job{`${currentCount === 1 ? "" : "s"}`} received this month
                </KpiText>
                <KpiIndicator change={change} className="col-3">
                    <FontAwesomeIcon
                        fixedWidth
                        icon={
                            change > 0
                                ? faChevronUp
                                : change < 0
                                ? faChevronDown
                                : faMinus
                        }
                    />
                    {change !== 0 && Math.abs(change)}
                </KpiIndicator>
            </div>
        </Card>
    );
};
