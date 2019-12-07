using Scheduler.Application.Workers.Queries.GetWorkersCalendar;
using Scheduler.Domain.ValueObjects;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Scheduler.Application.Common.Interfaces
{
    public interface ICalendarRepository
    { 
        Task<IEnumerable<WorkerCalendarDto>> GetWorkersCalendar(DateTimeRange period);
    }
}
