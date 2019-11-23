using Moq;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Trainings.Commands.EditTraining;
using Scheduler.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Trainings.Commands
{
    public class EditTrainingCommandHandlerTests
    {
        private readonly Mock<ITrainingRepository> mockRepo;

        public EditTrainingCommandHandlerTests()
        {
            mockRepo = new Mock<ITrainingRepository>();
        }

        [Fact]
        public async Task Handler_SuccessfullyUpdatesExistingTraining()
        {
            var trainingId = 1;
            var command = new EditTrainingCommand
            {
                TrainingId = trainingId,
                Description = "Updated Training",
                Location = "Board Room",
                Start = DateTime.Now,
                End = DateTime.Now,
            };
            mockRepo.Setup(x => x.GetById(trainingId)).ReturnsAsync(new Training());
            var handler = new EditTrainingCommandHandler(mockRepo.Object);

            await handler.Handle(command, CancellationToken.None);

            mockRepo.Verify(x => x.Update(It.Is<Training>(
                t => t.Description == command.Description &&
                     t.Location == command.Location &&
                     t.TrainingPeriod.Start == command.Start &&
                     t.TrainingPeriod.End == command.End
                )), Times.Once());
        }

        [Fact]
        public async Task Handler_ThrowsNotFoundException_WhenTrainingDoesNotExist()
        {
            var trainingId = 1;
            var command = new EditTrainingCommand
            {
                TrainingId = trainingId,
                Description = "Updated Training",
                Location = "Board Room",
                Start = DateTime.Now,
                End = DateTime.Now,
            };
            var handler = new EditTrainingCommandHandler(mockRepo.Object);

            await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(command, CancellationToken.None));
        }
    }
}
