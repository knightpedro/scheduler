import React from 'react';
import { GroupWeekSchedule, useWeekPicker } from '../../common/schedule'; 
import Container from '../../common/containers';
import { useWorkersCalendar, createWorkersSchedule } from './workersCalendar';
import { Loading, LoadingFailure } from '../../common/loading';
import moment from 'moment';


const WorkersWeekSchedule = () => {
    const [start, end, next, previous, reset, setDate] = useWeekPicker();
    const [loading, error, workersCalendar] = useWorkersCalendar(start, end);

    const handleDateChange = date => {
        if (date instanceof moment) setDate(date);
    };

    const renderComponent = component => (
        <Container>
            <h2>Staff Schedule</h2>
            {component}
        </Container>
    );

    if (loading) return renderComponent(<Loading />);
    if (error) return renderComponent(<LoadingFailure message={error.message} />);

    const workersSchedule = createWorkersSchedule(workersCalendar, start, end);

    return renderComponent(
        <GroupWeekSchedule resources={workersSchedule} start={start} onNextWeek={next} onPreviousWeek={previous} onReset={reset} onDateChange={handleDateChange}/>
    );
};

export default WorkersWeekSchedule;