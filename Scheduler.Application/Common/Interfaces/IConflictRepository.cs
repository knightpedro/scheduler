using Scheduler.Application.Conflicts.Queries;
using Scheduler.Domain.ValueObjects;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Scheduler.Application.Common.Interfaces
{
    public interface IConflictRepository
    {
        Task<IEnumerable<ResourceConflictsVm>> GetResourceConflicts();
        Task<IEnumerable<ResourceConflictDto>> GetResourceConflicts(int resourceId);
        Task<IEnumerable<ResourceConflictDto>> GetResourceConflicts(int resourceId, DateTimeRange period);
        Task<IEnumerable<WorkerConflictsVm>> GetWorkerConflicts();
        Task<IEnumerable<WorkerConflictDto>> GetWorkerConflicts(int workerId);
        Task<IEnumerable<WorkerConflictDto>> GetWorkerConflicts(int workerId, DateTimeRange period);
    }
}
