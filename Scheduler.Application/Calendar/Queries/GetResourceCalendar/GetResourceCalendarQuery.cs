using MediatR;
using System;

namespace Scheduler.Application.Calendar.Queries.GetResourceCalendar
{
    public class GetResourceCalendarQuery : IRequest<ResourceCalendarDto>
    {
        public int Id { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
    }
}
