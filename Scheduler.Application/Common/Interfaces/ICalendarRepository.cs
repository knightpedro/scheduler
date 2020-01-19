using Scheduler.Application.Calendar.Queries;
using Scheduler.Domain.ValueObjects;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Scheduler.Application.Common.Interfaces
{
    public interface ICalendarRepository
    {
        Task<ResourceCalendarDto> GetResourceCalendar(int resourceId);
        Task<ResourceCalendarDto> GetResourceCalendar(int resourceId, DateTimeRange period);
        Task<IEnumerable<ResourceCalendarDto>> GetResourcesCalendar(DateTimeRange period);

        Task<WorkerCalendarDto> GetWorkerCalendar(int workerId);
        Task<WorkerCalendarDto> GetWorkerCalendar(int workerId, DateTimeRange period);
        Task<IEnumerable<WorkerCalendarDto>> GetWorkersCalendar(DateTimeRange period);
    }
}
