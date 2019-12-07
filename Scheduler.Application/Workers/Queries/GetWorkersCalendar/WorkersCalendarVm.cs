using System.Collections.Generic;

namespace Scheduler.Application.Workers.Queries.GetWorkersCalendar
{
    public class WorkersCalendarVm
    {
        public IEnumerable<WorkerCalendarDto> Workers { get; set; }
    }
}
