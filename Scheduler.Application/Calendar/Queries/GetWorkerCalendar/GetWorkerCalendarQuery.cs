using MediatR;
using System;

namespace Scheduler.Application.Calendar.Queries.GetWorkerCalendar
{
    public class GetWorkerCalendarQuery : IRequest<WorkerCalendarDto>
    {
        public int Id { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
    }
}
