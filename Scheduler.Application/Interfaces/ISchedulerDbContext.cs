using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Interfaces
{
    public interface ISchedulerDbContext
    {
        DbSet<Coordinator> Coordinators { get; set; }
        DbSet<Crew> Crews { get; set; }
        DbSet<Job> Jobs { get; set; }
        DbSet<JobTask> JobTasks { get; set; }
        DbSet<Leave> Leave { get; set; }
        DbSet<Resource> Resources { get; set; }
        DbSet<ResourceOutOfService> ResourceOutOfService { get; set; }
        DbSet<ResourceShift> ResourceShifts { get; set; }
        DbSet<Role> Roles { get; set; }
        DbSet<Training> Training { get; set; }
        DbSet<Worker> Workers { get; set; }
        DbSet<WorkerCrew> WorkerCrews { get; set; }
        DbSet<WorkerRole> WorkerRoles { get; set; }
        DbSet<WorkerShift> WorkerShifts { get; set; }
        DbSet<WorkerTraining> WorkerTraining { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
