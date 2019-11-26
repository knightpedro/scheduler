using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Persistence.Repositories
{
    public class JobTaskRepository : SchedulerRepository<JobTask>, IJobTaskRepository
    {
        public JobTaskRepository(SchedulerDbContext context)
            :base(context)
        {
        }

        public async Task AddResources(int id, IEnumerable<int> resourceIds)
        {
            var shifts = resourceIds.Select(resourceId => new ResourceShift { JobTaskId = id, ResourceId = resourceId });
            context.ResourceShifts.AddRange(shifts);
            await context.SaveChangesAsync();
        }

        public async Task AddWorkers(int id, IEnumerable<int> workerIds)
        {
            var shifts = workerIds.Select(workerId => new WorkerShift { JobTaskId = id, WorkerId = workerId });
            context.WorkerShifts.AddRange(shifts);
            await context.SaveChangesAsync();
        }

        public async Task<JobTask> GetByIdWithShifts(int id)
        {
            return await context.JobTasks
                .Include(j => j.WorkerShifts)
                    .ThenInclude(ws => ws.Worker)
                .Include(j => j.ResourceShifts)
                    .ThenInclude(rs => rs.Resource)
                .SingleOrDefaultAsync(j => j.Id == id);
        }

        public async Task RemoveResources(int id, IEnumerable<int> resourceIds)
        {
            var shifts = await context.ResourceShifts.Where(rs => rs.JobTaskId == id).ToListAsync();
            var shiftsToRemove = shifts.Where(rs => resourceIds.Contains(rs.ResourceId));
            context.ResourceShifts.RemoveRange(shiftsToRemove);
            await context.SaveChangesAsync();
        }

        public async Task RemoveWorkers(int id, IEnumerable<int> workerIds)
        {
            var shifts = await context.WorkerShifts.Where(ws => ws.JobTaskId == id).ToListAsync();
            var shiftsToRemove = shifts.Where(ws => workerIds.Contains(ws.WorkerId));
            context.WorkerShifts.RemoveRange(shiftsToRemove);
            await context.SaveChangesAsync();
        }
    }
}
