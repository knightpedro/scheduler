using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Entities;
using Scheduler.Persistence.Tests.Common;
using System.Linq;
using Xunit;

namespace Scheduler.Persistence.Tests.Configurations
{
    public class JobConfigurationTests : ContextTestBase
    {
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
    }
}