using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Entities;
using System.Linq;
using Xunit;

namespace Scheduler.Persistence.UnitTests
{
    public class JobConfigurationTests
    {
        [Fact]
        public void Job_ProperlyConfigured_CanWrite()
        {
            var options = TestContextOptionsBuilder.CreateSqliteOptions<SchedulerDbContext>();
            var jobNumber = "J124";

            using (var context = new SchedulerDbContext(options))
            {
                context.Database.OpenConnection();
                context.Database.EnsureCreated();

                var job = new Job
                {
                    JobNumber = jobNumber,
                    Description = "A simple job.",
                    Location = "Test St"
                };

                context.Jobs.Add(job);
                context.SaveChanges();
            }

            using (var context = new SchedulerDbContext(options))
            {
                context.Database.EnsureCreated();
                var job = context.Jobs.Where(j => j.JobNumber == jobNumber).FirstOrDefault();
                Assert.NotNull(job);
            }
        }

        [Fact]
        public void Job_Number_IsRequired()
        {
            var options = TestContextOptionsBuilder.CreateSqliteOptions<SchedulerDbContext>();
            using(var context = new SchedulerDbContext(options))
            {
                context.Database.OpenConnection();
                context.Database.EnsureCreated();

                var job = new Job 
                { 
                    Description = "A simple job.",
                    Location = "Test St"
                };

                context.Jobs.Add(job);

                Assert.Throws<DbUpdateException>(() => context.SaveChanges());
            }
        }
    }
}