using Scheduler.Domain.Dtos;
using Scheduler.Domain.ValueObjects;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Scheduler.Application.Common.Interfaces
{
    public interface IConflictRepository
    {
        Task<IEnumerable<ConflictDto>> GetResourceConflicts(int resourceId, DateTimeRange period);
        Task<IEnumerable<ConflictDto>> GetWorkerConflicts(int workerId, DateTimeRange period);
    }
}
