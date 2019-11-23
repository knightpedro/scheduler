using Moq;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Workers.Queries.GetWorkerLeave;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Queries
{
    public class GetWorkerLeaveQueryHandlerTests
    {
        private readonly Mock<IRepository<Worker>> mockRepo;

        public GetWorkerLeaveQueryHandlerTests()
        {
            mockRepo = new Mock<IRepository<Worker>>();
        }

        [Fact]
        public async Task QueryHandler_ReturnsEmptyViewModel_WhenNoLeaveFound()
        {
            mockRepo.Setup(x => x.FirstOrDefault(
                It.IsAny<Expression<Func<Worker, bool>>>(), 
                It.IsAny<Expression<Func<Worker, object>>>())
            ).ReturnsAsync(GetWorkerWithNoLeave());

            var workerId = 1;
            var query = new GetWorkerLeaveQuery { WorkerId = workerId};
            var handler = new GetWorkerLeaveQueryHandler(mockRepo.Object);

            var vm = await handler.Handle(query, CancellationToken.None);

            Assert.NotNull(vm);
            Assert.Empty(vm.WorkerLeave);
        }

        [Fact]
        public async Task QueryHandler_ReturnsCorrectLeaveViewModel()
        {
            mockRepo.Setup(x => x.FirstOrDefault(
                It.IsAny<Expression<Func<Worker, bool>>>(),
                It.IsAny<Expression<Func<Worker, object>>>())
            ).ReturnsAsync(GetWorkerWithLeave());

            var workerId = 1;
            var query = new GetWorkerLeaveQuery { WorkerId = workerId };
            var handler = new GetWorkerLeaveQueryHandler(mockRepo.Object);
            var expectedWorker = GetWorkerWithLeave();
            var expectedLeave = expectedWorker.Leave.First();

            var vm = await handler.Handle(query, CancellationToken.None);
            var leaveResult = vm.WorkerLeave.First();

            Assert.Equal(1, vm.WorkerLeave.Count);
            Assert.Equal(expectedLeave.LeavePeriod.Start, leaveResult.Start);
            Assert.Equal(expectedLeave.LeavePeriod.End, leaveResult.End);
            Assert.Equal(expectedLeave.LeaveType.ToString(), leaveResult.LeaveType);
        }

        private Worker GetWorkerWithNoLeave()
        {
            return new Worker { Name = "Test" };
        }

        private Worker GetWorkerWithLeave()
        {
            var worker = new Worker { Name = "Test" };
            var leaveStart = new DateTime(2019, 11, 1);
            var leaveEnd = new DateTime(2019, 11, 5);
            var leavePeriod = new DateTimeRange(leaveStart, leaveEnd);
            var leave = new Leave
            {
                LeavePeriod = leavePeriod,
                LeaveType = LeaveType.Annual
            };
            worker.Leave.Add(leave);
            return worker;
        }
    }
}
