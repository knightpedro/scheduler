using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Tests.Common;
using Scheduler.Application.Workers.Commands.DeleteLeave;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using Scheduler.Persistence;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Commands
{
    public class DeleteLeaveCommandTests : DisconnectedAppTestBase
    {
        [Fact]
        public async Task DeleteCommand_SuccessfullyHandled_WhenLeaveExists()
        {
            int leaveId;

            SeedWorker();

            using (var context = new SchedulerDbContext(options))
            {
                var worker = context.Workers.Include(w => w.Leave).First();
                leaveId = worker.Leave.First().Id;
            }

            using (var context = new SchedulerDbContext(options))
            {
                var command = new DeleteLeaveCommand { LeaveId = leaveId };
                var handler = new DeleteLeaveCommandHandler(context);

                await handler.Handle(command, CancellationToken.None);

                var deletedLeave = context.Leave.Find(command.LeaveId);
                Assert.Null(deletedLeave);
            }
        }

        [Fact]
        public async Task DeleteCommand_ThrowsNotFoundException_WhenLeaveNotFound()
        {
            using (var context = new SchedulerDbContext(options))
            {
                var command = new DeleteLeaveCommand { LeaveId = 1 };
                var handler = new DeleteLeaveCommandHandler(context);

                await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(command, CancellationToken.None));
            }
        }

        private void SeedWorker()
        {
            using (var context = new SchedulerDbContext(options))
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
                context.SaveChanges();
            }
        }
    }
}
