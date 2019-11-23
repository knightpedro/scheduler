using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading.Tasks;

namespace Scheduler.Persistence.Repositories
{
    public class JobRepository : SchedulerRepository<Job>, IJobRepository
    {
        public JobRepository(SchedulerDbContext context)
            : base(context)
        { 
        }

        public async Task<Job> GetJobDetail(int Id)
        {
            return await context.Jobs
                .Include(j => j.Coordinator)
                .Include(j => j.JobTasks)
                .SingleOrDefaultAsync(j => j.Id == Id);
        }
    }
}
