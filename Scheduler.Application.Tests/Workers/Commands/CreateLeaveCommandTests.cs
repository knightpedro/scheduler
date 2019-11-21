using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Tests.Common;
using Scheduler.Application.Workers.Commands.CreateLeave;
using Scheduler.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Commands
{
    public class CreateLeaveCommandTests : CommandTestBase<Leave>
    {
        [Fact]
        public async Task Handler_ThrowsDbUpdateException_WorkerDoesNotExist()
        {
            var command = new CreateLeaveCommand
            {
                WorkerId = 1,
                Start = new DateTime(2019, 11, 1),
                End = new DateTime(2019, 11, 2),
                LeaveType = "Annual"
            };
            var handler = new CreateLeaveCommandHandler(repo);
            await Assert.ThrowsAsync<DbUpdateException>(() => handler.Handle(command, CancellationToken.None));
        }
    }
}
