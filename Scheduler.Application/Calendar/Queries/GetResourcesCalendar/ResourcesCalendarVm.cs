using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Calendar.Queries.GetResourcesCalendar
{
    public class ResourcesCalendarVm
    {
        public IEnumerable<ResourceCalendarDto> Resources { get; set; }
    }
}
