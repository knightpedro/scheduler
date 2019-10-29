using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Interfaces;
using Scheduler.Domain.Entities;

/* TO CREATE DATABASE GENERATION SCRIPT
 * 
 * To create migrations, install Entity Framework Tools package on the Web API (set as startup project).
 * Confirm tools are installed by tying Get-Help about_EntityFrameworkCore in the Package Manager Console.
 * 
 * In the Package Manager Console, set the Default Project to Persistence.
 * 
 * >> Add-Migration Initial
 * 
 * >> Script-Migration
 * 
 * If the script is suitable . . .
 * 
 * >> Update-Database
 */

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
