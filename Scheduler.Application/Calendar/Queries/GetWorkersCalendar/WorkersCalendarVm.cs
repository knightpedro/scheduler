using System.Collections.Generic;

namespace Scheduler.Application.Calendar.Queries.GetWorkersCalendar
{
    public class WorkersCalendarVm
    {
        public IEnumerable<WorkerCalendarDto> Workers { get; set; }
    }
}
