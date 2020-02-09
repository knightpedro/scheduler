import React from 'react';
import { createResourcesSchedule, useResourcesCalendar } from './resourcesCalendar';
import { GroupWeekSchedule, useWeekPicker } from '../../common/schedule'; 
import Container from '../../common/containers';
import { Loading, LoadingFailure } from '../../common/loading';
import moment from 'moment';

const ResourcesWeekSchedule = () => {
    const [start, end, next, previous, reset, setDate] = useWeekPicker();
    const [loading, error, resourcesCalendar] = useResourcesCalendar(start, end);

    const handleDateChange = date => {
        if (date instanceof moment) setDate(date);
    };

    const renderComponent = component => (
        <Container>
            <h2>Plant Schedule</h2>
            {component}
        </Container>
    );

    if (loading) return renderComponent(<Loading />);
    if (error) return renderComponent(<LoadingFailure message={error.message} />);

    const resourcesSchedule = createResourcesSchedule(resourcesCalendar, start, end);

    return renderComponent(
        <GroupWeekSchedule resources={resourcesSchedule} start={start} onNextWeek={next} onPreviousWeek={previous} onReset={reset} onDateChange={handleDateChange}/>
    );
};

export default ResourcesWeekSchedule;