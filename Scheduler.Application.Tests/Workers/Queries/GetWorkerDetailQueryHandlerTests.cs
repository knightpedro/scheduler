using Moq;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Workers.Queries.GetWorkerDetail;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Queries
{
    public class GetWorkerDetailQueryHandlerTests
    {
        protected readonly Mock<IRepository<Worker>> mockRepo;

        public GetWorkerDetailQueryHandlerTests()
        {
            Worker worker = new Worker { Name = "Test Worker", IsActive = true };
            Worker nullWorker = null;

            mockRepo = new Mock<IRepository<Worker>>();
            mockRepo.Setup(x => x.GetById(1)).ReturnsAsync(worker);
            mockRepo.Setup(x => x.GetById(It.Is<int>(i => i != 1))).ReturnsAsync(nullWorker);
        }

        [Fact]
        public async Task GetWorkerDetailQuery_ReturnsViewModel_WhenWorkerExists()
        {
            var workerId = 1;
            var handler = new GetWorkerDetailQueryHandler(mockRepo.Object);

            var result = await handler.Handle(new GetWorkerDetailQuery { Id = workerId }, CancellationToken.None);

            mockRepo.Verify(x => x.GetById(workerId), Times.Once());
            Assert.NotNull(result);
        }

        [Fact]
        public async Task GetWorkerDetailQuery_ThrowsNotFoundException_WhenWorkerDoesNotExist()
        {
            var workerId = 5;
            var handler = new GetWorkerDetailQueryHandler(mockRepo.Object);
            await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(new GetWorkerDetailQuery { Id = workerId }, CancellationToken.None));
        }
    }
}
