using Scheduler.Application.Tests.Common;
using Scheduler.Application.Workers.Queries.GetWorkerLeave;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Queries
{
    public class GetWorkerLeaveQueryHandlerTests : QueryTestBase
    {
        [Fact]
        public async Task QueryHandler_ReturnsEmptyViewModel_WhenNoLeaveFound()
        {
            var query = new GetWorkerLeaveQuery { WorkerId = 1 };
            var handler = new GetWorkerLeaveQueryHandler(context, mapper);
            var vm = await handler.Handle(query, CancellationToken.None);
            Assert.Empty(vm.WorkerLeave);
        }

        [Fact]
        public async Task QueryHandler_ReturnsCorrectLeaveViewModel()
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
            context.Workers.Add(worker);
            await context.SaveChangesAsync(CancellationToken.None);

            var query = new GetWorkerLeaveQuery { WorkerId = 1 };
            var handler = new GetWorkerLeaveQueryHandler(context, mapper);
            var vm = await handler.Handle(query, CancellationToken.None);
            var leaveResult = vm.WorkerLeave.First();

            Assert.Equal(1, vm.WorkerLeave.Count);
            Assert.Equal(leaveStart, leaveResult.Start);
            Assert.Equal(leaveEnd, leaveResult.End);
            Assert.Equal(LeaveType.Annual.ToString(), leaveResult.LeaveType);
        }
    }
}
