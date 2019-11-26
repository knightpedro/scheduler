using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Scheduler.Application.Common.Interfaces
{
    public interface IJobTaskRepository : IRepository<JobTask>
    {
        Task<JobTask> GetByIdWithShifts(int id);

        Task AddResources(int id, IEnumerable<int> resourceIds);
        Task AddWorkers(int id, IEnumerable<int> workerIds);

        Task RemoveResources(int id, IEnumerable<int> resourceIds);
        Task RemoveWorkers(int id, IEnumerable<int> workerIds);
    }
}
