using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Tests.Common;
using Scheduler.Application.Workers.Queries.GetWorkerDetail;
using Scheduler.Domain.Entities;
using Scheduler.Persistence.Repositories;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Queries
{
    public class GetWorkerDetailQueryHandlerTests
    {
        private readonly SchedulerRepository<Worker> repo;

        public GetWorkerDetailQueryHandlerTests()
        {
            repo = RepositoryFactory.CreateRepository<Worker>();
        }

        [Fact]
        public async Task GetWorkerDetailQuery_ReturnsViewModel_WhenWorkerExists()
        {
            var worker = new Worker
            {
                Name = "Terry",
                IsActive = true
            };
            await repo.Add(worker);

            var handler = new GetWorkerDetailQueryHandler(repo);
            var result = await handler.Handle(new GetWorkerDetailQuery { Id = 1 }, CancellationToken.None);

            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
        }

        [Fact]
        public async Task GetWorkerDetailQuery_ThrowsNotFoundException_WhenWorkerDoesNotExist()
        {
            var handler = new GetWorkerDetailQueryHandler(repo);
            await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(new GetWorkerDetailQuery { Id = 10 }, CancellationToken.None));
        }
    }
}
