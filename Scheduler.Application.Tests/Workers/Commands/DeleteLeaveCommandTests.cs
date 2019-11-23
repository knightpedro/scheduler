using Moq;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Workers.Commands.DeleteLeave;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Commands
{
    public class DeleteLeaveCommandTests
    {
        private readonly Mock<IRepository<Leave>> mockRepo;

        public DeleteLeaveCommandTests()
        {
            mockRepo = new Mock<IRepository<Leave>>();
        }

        [Fact]
        public async Task DeleteCommand_DeletesCorrectLeave()
        {
            var command = new DeleteLeaveCommand { LeaveId = 1 };
            var handler = new DeleteLeaveCommandHandler(mockRepo.Object);
            mockRepo.Setup(x => x.GetById(command.LeaveId)).ReturnsAsync(new Leave());

            await handler.Handle(command, CancellationToken.None);

            mockRepo.Verify(x => x.GetById(command.LeaveId), Times.Once());
            mockRepo.Verify(x => x.Remove(It.IsAny<Leave>()), Times.Once());
        }

        [Fact]
        public async Task DeleteCommand_ThrowsNotFoundException_WhenLeaveNotFound()
        {
            Leave nullLeave = null;
            var command = new DeleteLeaveCommand { LeaveId = 1 };
            var handler = new DeleteLeaveCommandHandler(mockRepo.Object);
            mockRepo.Setup(x => x.GetById(It.IsAny<int>())).ReturnsAsync(nullLeave);

            await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(command, CancellationToken.None));
        }
    }
}
