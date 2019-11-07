using AutoMapper;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Tests.Common;
using Scheduler.Application.Workers.Queries.GetWorkerDetail;
using Scheduler.Domain.Entities;
using Scheduler.Persistence;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Queries
{
    public class GetWorkersDetailQueryHandlerTests : IClassFixture<QueryTestFixture>
    {
        private readonly SchedulerDbContext _context;
        private readonly IMapper _mapper;

        public GetWorkersDetailQueryHandlerTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _mapper = fixture.Mapper;
        }

        [Fact]
        public async Task GetWorkerDetailQuery_ReturnsViewModel_WhenWorkerExists()
        {
            var worker = new Worker
            {
                Name = "Terry",
                IsActive = true
            };
            _context.Workers.Add(worker);
            _context.SaveChanges();

            var handler = new GetWorkerDetailQueryHandler(_context, _mapper);
            var result = await handler.Handle(new GetWorkerDetailQuery { Id = 1 }, CancellationToken.None);

            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
        }

        [Fact]
        public async Task GetWorkerDetailQuery_ThrowsNotFoundException_WhenWorkerDoesNotExist()
        {
            var handler = new GetWorkerDetailQueryHandler(_context, _mapper);
            var workers = _context.Workers.ToList();
            await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(new GetWorkerDetailQuery { Id = 10 }, CancellationToken.None));
        }
    }
}
