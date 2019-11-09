using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Tests.Common;
using Scheduler.Application.Workers.Commands.CreateLeave;
using Scheduler.Domain.Entities;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Commands
{
    public class CreateLeaveCommandTests : CommandTestBase
    {
        [Fact]
        public async Task Handler_ThrowsDbUpdateException_WorkerIdDoesNotExist()
        {
            var command = new CreateLeaveCommand
            {
                WorkerId = 1,
                Start = new DateTime(2019, 11, 1),
                End = new DateTime(2019, 11, 2),
                LeaveType = "Annual"
            };
            var handler = new CreateLeaveCommandHandler(context);
            await Assert.ThrowsAsync<DbUpdateException>(() => handler.Handle(command, CancellationToken.None));
        }

        [Fact]
        public async Task Handler_SuccessfullyCreatesLeave()
        {
            var worker = new Worker { Name = "Test" };
            context.Workers.Add(worker);
            context.SaveChanges();

            var command = new CreateLeaveCommand
            {
                WorkerId = worker.Id,
                Start = new DateTime(2019, 11, 1),
                End = new DateTime(2019, 11, 2),
                LeaveType = "Annual"
            };

            var handler = new CreateLeaveCommandHandler(context);
            var result = await handler.Handle(command, CancellationToken.None);
            var leave = context.Leave.First();
            Assert.Equal(leave.Id, result);
        }
    }
}
