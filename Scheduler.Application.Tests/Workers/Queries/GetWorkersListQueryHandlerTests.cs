using AutoMapper;
using Scheduler.Application.Tests.Common;
using Scheduler.Application.Workers.Queries.GetWorkersList;
using Scheduler.Domain.Entities;
using Scheduler.Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Queries
{
    public class GetWorkersListQueryHandlerTests : QueryTestBase
    {
        [Fact]
        public async Task QueryHandlerReturnsWorkers()
        {
            var workers = new List<Worker>
            {
                new Worker { Name = "Fred", IsActive = true },
                new Worker { Name = "Joe", IsActive = true },
                new Worker { Name = "Morris", IsActive = true }
            };
            context.Workers.AddRange(workers);
            context.SaveChanges();

            var handler = new GetWorkersListQueryHandler(context, mapper);
            var result = await handler.Handle(new GetWorkersListQuery(), CancellationToken.None);

            var fred = result.Workers.Where(w => w.Name == "Fred").SingleOrDefault();

            Assert.NotNull(fred);
            Assert.Equal(3, result.Workers.Count);
        }
    }
}
