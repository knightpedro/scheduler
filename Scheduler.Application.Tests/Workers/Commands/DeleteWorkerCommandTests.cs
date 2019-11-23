using Moq;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Workers.Commands.DeleteWorker;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Commands
{
    public class DeleteWorkerCommandTests
    {
        private readonly Mock<IRepository<Worker>> mockRepo;

        public DeleteWorkerCommandTests()
        {
            mockRepo = new Mock<IRepository<Worker>>();
        }

        [Fact]
        public async Task DeleteCommandHandler_SuccessfullyDeletesWorker_WhenWorkerExists()
        {
            var worker = GetWorkerToDelete();
            var command = new DeleteWorkerCommand { Id = worker.Id};
            var handler = new DeleteWorkerCommandHandler(mockRepo.Object);
            mockRepo.Setup(x => x.GetById(worker.Id)).ReturnsAsync(GetWorkerToDelete());

            await handler.Handle(command, CancellationToken.None);

            mockRepo.Verify(x => x.GetById(worker.Id), Times.Once());
            mockRepo.Verify(x => x.Remove(It.Is<Worker>(w => w.Id == worker.Id)), Times.Once());
        }

        [Fact]
        public async Task DeleteCommandHandler_ThrowsException_WhenWorkerDoesNotExit ()
        {
            var workerId = 1;
            var command = new DeleteWorkerCommand { Id = workerId };
            var handler = new DeleteWorkerCommandHandler(mockRepo.Object);

            await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(command, CancellationToken.None));

            mockRepo.Verify(x => x.GetById(workerId), Times.Once());
            mockRepo.Verify(x => x.Remove(It.IsAny<Worker>()), Times.Never());
        }

        private Worker GetWorkerToDelete()
        {
            return new Worker
            {
                Name = "Test Worker"
            };
        }
    }
}
