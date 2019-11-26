using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Persistence.Repositories
{
    public class TrainingRepository : SchedulerRepository<Training>, ITrainingRepository
    {
        public TrainingRepository(SchedulerDbContext context)
            : base(context)
        {
        }

        public async Task AddWorker(int trainingId, int workerId)
        {
            var workerTraining = new WorkerTraining
            {
                TrainingId = trainingId,
                WorkerId = workerId
            };

            context.WorkerTraining.Add(workerTraining);
            await context.SaveChangesAsync();
        }

        public async Task AddWorkers(int trainingId, IEnumerable<int> workerIds)
        {
            var workerTraining = workerIds.Select(w => new WorkerTraining
            {
                TrainingId = trainingId,
                WorkerId = w
            }).ToList();

            context.WorkerTraining.AddRange(workerTraining);
            await context.SaveChangesAsync();
        }

        public async Task<Training> GetTrainingWithWorkers(int trainingId)
        {
            return await context.Training
                .Include(t => t.WorkerTraining)
                .ThenInclude(wt => wt.Worker)
                .SingleOrDefaultAsync(t => t.Id == trainingId);
        }

        public async Task RemoveWorker(int trainingId, int workerId)
        {
            var workerTraining = await context.WorkerTraining.SingleOrDefaultAsync(wt => wt.TrainingId == trainingId && wt.WorkerId == workerId);
            context.Remove(workerTraining);
            await context.SaveChangesAsync();
        }

        public async Task RemoveWorkers(int trainingId, IEnumerable<int> workerIds)
        {
            var workerTraining = await context.WorkerTraining
                .Where(wt => wt.TrainingId == trainingId)
                .ToListAsync();

            var workerTrainingToRemove = workerTraining.Where(wt => workerIds.Contains(wt.WorkerId));
            context.WorkerTraining.RemoveRange(workerTrainingToRemove);
            await context.SaveChangesAsync();
        }
    }
}
