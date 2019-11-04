using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Entities;
using System;
using System.Linq;
using Xunit;

namespace Scheduler.Persistence.UnitTests.Configurations
{
    public class JobConfigurationTests : IDisposable
    {
        private readonly SchedulerDbContext context;

        public JobConfigurationTests()
        {
            var options = TestContextOptionsBuilder.CreateSqliteOptions<SchedulerDbContext>();
            context = new SchedulerDbContext(options);
            context.Database.OpenConnection();
            context.Database.EnsureCreated();
        }

        [Fact]
        public void Job_ProperlyInsantiated_CanWriteAndReadFromDatabase()
        {
            var jobNumber = "J124";
            var job = new Job
            {
                JobNumber = jobNumber,
                Description = "A simple job.",
                Location = "Test St"
            };
            context.Jobs.Add(job);
            context.SaveChanges();
            var saved_job = context.Jobs.Where(j => j.JobNumber == jobNumber).SingleOrDefault();
            Assert.NotNull(saved_job);
        }

        [Fact]
        public void Job_JobNumber_IsRequired()
        {
            var job = new Job 
            { 
                Description = "A simple job.",
                Location = "Test St"
            };
            context.Jobs.Add(job);
            Assert.Throws<DbUpdateException>(() => context.SaveChanges());
        }

        public void Dispose()
        {
            context.Database.EnsureDeleted();
            context.Dispose();
        }
    }
}