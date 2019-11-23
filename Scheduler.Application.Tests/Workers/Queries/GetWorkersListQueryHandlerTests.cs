using Moq;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Workers.Queries.GetWorkersList;
using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Queries
{
    public class GetWorkersListQueryHandlerTests
    {
        private readonly Mock<IRepository<Worker>> mockRepo;

        public GetWorkersListQueryHandlerTests()
        {
            mockRepo = new Mock<IRepository<Worker>>();
            mockRepo.Setup(x => x.GetAll(It.IsAny<int>(), It.IsAny<int>())).ReturnsAsync(GetWorkersList());
        }

        [Fact]
        public async Task QueryHandlerReturnsWorkers()
        {
            var handler = new GetWorkersListQueryHandler(mockRepo.Object);
            var query = new GetWorkersListQuery { PageNumber = 1, PageSize = 20 };

            var result = await handler.Handle(query, CancellationToken.None);
            var fred = result.Workers.Where(w => w.Name == "Fred").SingleOrDefault();

            mockRepo.Verify(x => x.GetAll(query.PageNumber, query.PageSize), Times.Once());
            Assert.NotNull(fred);
            Assert.Equal(3, result.Workers.Count());
        }

        private List<Worker> GetWorkersList()
        {
            return  new List<Worker>
            {
                new Worker { Name = "Fred", IsActive = true },
                new Worker { Name = "Joe", IsActive = true },
                new Worker { Name = "Morris", IsActive = true }
            };
        }
    }
}
