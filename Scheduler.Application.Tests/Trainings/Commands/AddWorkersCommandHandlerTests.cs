using Moq;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Trainings.Commands.AddWorkers;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Trainings.Commands
{
    public class AddWorkersCommandHandlerTests
    {
        private readonly Mock<ITrainingRepository> mockRepo;

        public AddWorkersCommandHandlerTests()
        {
            mockRepo = new Mock<ITrainingRepository>();
        }

        [Fact]
        public async Task Handler_SuccessfullyAssignsTrainingToExistingWorkers()
        {
            var trainingId = 1;
            var workerIds = GetWorkerIds();
            mockRepo.Setup(x => x.AddWorkers(trainingId, It.IsAny<IEnumerable<int>>())).Returns(Task.CompletedTask);
            var command = new AddWorkersCommand { TrainingId = trainingId, WorkerIds = workerIds,};
            var handler = new AddWorkersCommandHandler(mockRepo.Object);

            await handler.Handle(command, CancellationToken.None);

            mockRepo.Verify(x => x.AddWorkers(trainingId, It.IsAny<IEnumerable<int>>()), Times.Once());
        }

        private IEnumerable<int> GetWorkerIds()
        {
            return Enumerable.Range(1, 10);
        }
    }
}
