using Scheduler.Domain.Entities;
using Scheduler.Persistence.Repositories;
using Scheduler.Persistence.Tests.Common;
using Scheduler.Persistence.Tests.TestData;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Persistence.Tests.Repositories
{
    public class SchedulerRepositoryTests : ContextTestBase
    {
        [Fact]
        public async Task WorkerRepository_CanIncludeLeave()
        {
            var repo = new SchedulerRepository<Worker>(context);
            await repo.AddRange(SchedulerSeedData.GenerateWorkersWithLeave(10));

            var worker = await repo.FirstOrDefault(w => w.Name.Contains("Worker"), w => w.Leave);
            Assert.NotEmpty(worker.Leave);
        }

        [Fact]
        public async Task WorkerRepository_DoesNotIncludeLeaveByDefault()
        {
            var repo = new SchedulerRepository<Worker>(context);
            await repo.AddRange(SchedulerSeedData.GenerateWorkersWithLeave(10));

            var worker = await repo.FirstOrDefault(w => w.Name.Contains("Worker"));
            Assert.Empty(worker.Leave);
        }
    }
}
