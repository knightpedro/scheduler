using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Scheduler.Application.Common.Interfaces
{
    public interface IConflictRepository
    {
        Task<IEnumerable<JobTask>> GetJobTaskConflictsForWorker(int workerId, DateTimeRange period);
        Task<IEnumerable<Training>> GetTrainingConflicts(int workerId, DateTimeRange period);
        Task<IEnumerable<Leave>> GetLeaveConflicts(int workerId, DateTimeRange period);

        Task<IEnumerable<JobTask>> GetJobTaskConflictsForResource(int resourceId, DateTimeRange period);
        Task<IEnumerable<ResourceOutOfService>> GetResourceOutOfServiceConflicts(int resourceId, DateTimeRange period);
    }
}
