using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;

namespace Scheduler.Persistence
{
    public class SchedulerDbContext : DbContext, ISchedulerDbContext
    {
        public DbSet<Coordinator> Coordinators { get; set; }
        public DbSet<Crew> Crews { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobTask> JobTasks { get; set; }
        public DbSet<Leave> Leave { get; set; }
        public DbSet<Resource> Resources { get; set; }
        public DbSet<ResourceOutOfService> ResourceOutOfService { get; set; }
        public DbSet<ResourceShift> ResourceShifts { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Training> Training { get; set; }
        public DbSet<Worker> Workers { get; set; }
        public DbSet<WorkerCrew> WorkerCrews { get; set; }
        public DbSet<WorkerRole> WorkerRoles { get; set; }
        public DbSet<WorkerShift> WorkerShifts { get; set; }
        public DbSet<WorkerTraining> WorkerTraining { get; set; }

        public SchedulerDbContext(DbContextOptions<SchedulerDbContext> options) 
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(SchedulerDbContext).Assembly);
        }
    }
}
