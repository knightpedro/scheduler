using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Calendar.Queries.GetResourcesCalendar
{
    public class ResourceCalendarDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public IEnumerable<OutOfServiceDto> OutOfServices { get; set; }
        public IEnumerable<JobTaskDto> JobTasks { get; set; }
    }
}
