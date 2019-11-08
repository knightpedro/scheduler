using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Tests.Common;
using Scheduler.Application.Workers.Queries.GetWorkerDetail;
using Scheduler.Domain.Entities;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Queries
{
    public class GetWorkersDetailQueryHandlerTests : QueryTestBase
    {
        [Fact]
        public async Task GetWorkerDetailQuery_ReturnsViewModel_WhenWorkerExists()
        {
            var worker = new Worker
            {
                Name = "Terry",
                IsActive = true
            };
            context.Workers.Add(worker);
            context.SaveChanges();

            var handler = new GetWorkerDetailQueryHandler(context, mapper);
            var result = await handler.Handle(new GetWorkerDetailQuery { Id = 1 }, CancellationToken.None);

            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
        }

        [Fact]
        public async Task GetWorkerDetailQuery_ThrowsNotFoundException_WhenWorkerDoesNotExist()
        {
            var handler = new GetWorkerDetailQueryHandler(context, mapper);
            var workers = context.Workers.ToList();
            await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(new GetWorkerDetailQuery { Id = 10 }, CancellationToken.None));
        }
    }
}
