using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Calendar.Queries.GetResourcesCalendar
{
    public class GetResourcesCalendarQuery : IRequest<ResourcesCalendarVm>
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
