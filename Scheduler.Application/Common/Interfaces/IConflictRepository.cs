using Scheduler.Application.Conflicts;
using Scheduler.Domain.ValueObjects;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Scheduler.Application.Common.Interfaces
{
    public interface IConflictRepository
    {
        Task<IEnumerable<EntityConflictsVm>> GetResourcesConflicts();
        Task<IEnumerable<EntityConflictsVm>> GetResourcesConflicts(DateTimeRange period);
        Task<IEnumerable<ConflictDto>> GetConflictsForResource(int resourceId);
        Task<IEnumerable<ConflictDto>> GetConflictsForResource(int resourceId, DateTimeRange period);
        Task<IEnumerable<EntityConflictsVm>> GetWorkersConflicts();
        Task<IEnumerable<EntityConflictsVm>> GetWorkersConflicts(DateTimeRange period);
        Task<IEnumerable<ConflictDto>> GetConflictsForWorker(int workerId);
        Task<IEnumerable<ConflictDto>> GetConflictsForWorker(int workerId, DateTimeRange period);
    }
}
