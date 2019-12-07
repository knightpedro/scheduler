using MediatR;
using System;

namespace Scheduler.Application.Workers.Queries.GetWorkersCalendar
{
    public class GetWorkersCalendarQuery : IRequest<WorkersCalendarVm>
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
