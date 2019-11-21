using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Scheduler.Application.Common.Interfaces
{
    public interface ITrainingRepository : IRepository<Training>
    {
        Task<Training> GetTrainingWithWorkers(int trainingId);

        Task AddWorker(int trainingId, int workerId);
        Task AddWorkers(int trainingId, IEnumerable<int> workerIds);

        Task RemoveWorker(int trainingId, int workerId);
        Task RemoveWorkers(int trainingId, IEnumerable<int> workerIds);
    }
}
