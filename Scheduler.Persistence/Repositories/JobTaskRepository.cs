using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading.Tasks;

namespace Scheduler.Persistence.Repositories
{
    public class JobTaskRepository : SchedulerRepository<JobTask>, IJobTaskRepository
    {
        public JobTaskRepository(SchedulerDbContext context)
            :base(context)
        {
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
    }
}
