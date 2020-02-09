import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import uuid from 'uuid/v4';


const APPOINTMENT_TIME_FORMAT = "HH:mm";

const StyledLink = styled(Link)`
    color: black;

    &:hover {
        text-decoration: none;
        color: black;
    }
`;

const Wrapper = styled.div`
    border: ${ props => props.isConflicting 
                ? props.theme.colours.appointments.conflict.border 
                : props.theme.colours.appointments[props.type].border 
            };
    border-radius: 3px;
    background-color: ${ props => props.theme.colours.appointments[props.type].background };
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
    padding: 5px 10px;
    margin-bottom: 2px;
    line-height: 1;

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

export const Appointment = ({type, description, path, isConflicting, ...props}) => {
    return (
        <StyledLink to={path}>
            <Wrapper type={type} isConflicting={isConflicting}>
                <Title>{description}</Title>
                <Content><small>{props.children}</small></Content>
            </Wrapper>
        </StyledLink>
    );
};

export const renderAppointment = (appointment) => {
    const { start, end } = appointment;
    const dayStart = start.clone().startOf('day');
    const dayEnd = start.clone().endOf('day');
    let content;
    if (start.isSameOrBefore(dayStart) && end.isSameOrAfter(dayEnd)) {
        content = "All day";
    }
    else {
        content = appointment.start.format(APPOINTMENT_TIME_FORMAT) + "-" + appointment.end.format(APPOINTMENT_TIME_FORMAT)
    }
    return (
        <Appointment key={uuid()} {...appointment}>
            {content}
        </Appointment>
    );
}