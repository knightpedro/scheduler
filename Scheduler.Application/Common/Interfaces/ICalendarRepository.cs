using Scheduler.Application.Calendar.Queries.GetResourcesCalendar;
using Scheduler.Application.Calendar.Queries.GetWorkersCalendar;
using Scheduler.Domain.ValueObjects;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Scheduler.Application.Common.Interfaces
{
    public interface ICalendarRepository
    {
        Task<IEnumerable<ResourceCalendarDto>> GetResourcesCalendar(DateTimeRange period);
        Task<IEnumerable<WorkerCalendarDto>> GetWorkersCalendar(DateTimeRange period);
    }
}
