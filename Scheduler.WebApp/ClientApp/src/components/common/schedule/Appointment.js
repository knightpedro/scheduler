import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import uuid from "uuid/v4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const APPOINTMENT_TIME_FORMAT = "HH:mm";

const StyledLink = styled(Link)`
    color: black;

    &:hover {
        text-decoration: none;
        color: black;
    }
`;

const Wrapper = styled.div`
    background-color: ${props => props.theme.colours.appointments[props.type]};
    border-radius: 4px;
    color: ${props => props.theme.colours.appointments.colour};
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    padding: 5px 10px;
    margin-bottom: 2px;
    line-height: 1em;
`;

const ConflictWrapper = styled(Wrapper)`
    background-color: ${props => props.theme.colours.surface};
    color: ${props => props.theme.colours.error};
    border: 2px solid ${props => props.theme.colours.error};
`;

const ConflictContentWrapper = styled.div`
    overflow: hidden;
`;

const Title = styled.div`
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
`;

const Content = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const Appointment = ({ type, description, path, ...props }) => {
    return (
        <StyledLink to={path}>
            <Wrapper type={type}>
                <Title>{description}</Title>
                <Content>
                    <small>{props.children}</small>
                </Content>
            </Wrapper>
        </StyledLink>
    );
};

const ConflictingAppointment = ({ type, description, path, ...props }) => (
    <StyledLink to={path}>
        <ConflictWrapper className="d-flex align-items-center">
            <ConflictContentWrapper className="mr-2">
                <Title>{description}</Title>
                <Content>
                    <small>{props.children}</small>
                </Content>
            </ConflictContentWrapper>
            <div className="ml-auto">
                <FontAwesomeIcon fixedWidth icon={faExclamationCircle} />
            </div>
        </ConflictWrapper>
    </StyledLink>
);

export const renderAppointment = appointment => {
    const { start, end } = appointment;
    const dayStart = start.clone().startOf("day");
    const dayEnd = start.clone().endOf("day");
    let content;
    if (start.isSameOrBefore(dayStart) && end.isSameOrAfter(dayEnd)) {
        content = "All day";
    } else {
        content =
            appointment.start.format(APPOINTMENT_TIME_FORMAT) +
            "-" +
            appointment.end.format(APPOINTMENT_TIME_FORMAT);
    }

    if (appointment.isConflicting) {
        return (
            <ConflictingAppointment key={uuid()} {...appointment}>
                {content}
            </ConflictingAppointment>
        );
    }

    return (
        <Appointment key={uuid()} {...appointment}>
            {content}
        </Appointment>
    );
};
