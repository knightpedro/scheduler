using Moq;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Workers.Commands.CreateLeave;
using Scheduler.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Commands
{
    public class CreateLeaveCommandTests
    {
        private readonly Mock<IRepository<Leave>> mockRepo;

        public CreateLeaveCommandTests()
        {
            mockRepo = new Mock<IRepository<Leave>>();
        }

        [Fact]
        public async Task Handler_CreatesLeave_WithCorrectWorker()
        {
            var command = new CreateLeaveCommand
            {
                WorkerId = 1,
                Start = new DateTime(2019, 11, 1),
                End = new DateTime(2019, 11, 2),
                LeaveType = "Annual"
            };
            var handler = new CreateLeaveCommandHandler(mockRepo.Object);

            await handler.Handle(command, CancellationToken.None);

            mockRepo.Verify(x => x.Add(It.Is<Leave>(l => l.WorkerId == command.WorkerId)), Times.Once());
        }
    }
}
