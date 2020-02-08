using Scheduler.Application.Common.Models;
using Scheduler.Application.Conflicts.Queries;
using Scheduler.Domain.ValueObjects;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Scheduler.Application.Common.Interfaces
{
    public interface IConflictRepository
    {
        Task<IEnumerable<ResourceConflictsVm>> GetResourceConflicts();
        Task<IEnumerable<Appointment>> GetResourceConflicts(int resourceId);
        Task<IEnumerable<Appointment>> GetResourceConflicts(int resourceId, DateTimeRange period);
        Task<IEnumerable<WorkerConflictsVm>> GetWorkerConflicts();
        Task<IEnumerable<Appointment>> GetWorkerConflicts(int workerId);
        Task<IEnumerable<Appointment>> GetWorkerConflicts(int workerId, DateTimeRange period);
    }
}
