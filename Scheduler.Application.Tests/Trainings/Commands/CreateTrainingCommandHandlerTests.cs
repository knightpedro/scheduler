using Moq;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Trainings.Commands.CreateTraining;
using Scheduler.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Trainings.Commands
{
    public class CreateTrainingCommandHandlerTests
    {
        private readonly Mock<ITrainingRepository> mockRepo;

        public CreateTrainingCommandHandlerTests()
        {
            mockRepo = new Mock<ITrainingRepository>();
        }

        [Fact]
        public async Task Handler_SuccessfullyPersistsTraining()
        {
            var command = new CreateTrainingCommand
            {
                Description = "Learning to do stuff",
                Location = "The learning place",
                Start = DateTime.Now,
                End = DateTime.Now.AddHours(5)
            };
            var handler = new CreateTrainingCommandHandler(mockRepo.Object);

            await handler.Handle(command, CancellationToken.None);

            mockRepo.Verify(x => x.Add(It.Is<Training>(
                t => t.Description == command.Description && 
                     t.Location == command.Location && 
                     t.TrainingPeriod.Start == command.Start &&
                     t.TrainingPeriod.End == command.End
                )), Times.Once());
        }
    }
}
