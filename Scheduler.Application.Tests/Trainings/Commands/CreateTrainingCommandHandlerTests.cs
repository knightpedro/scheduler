using Scheduler.Application.Tests.Common;
using Scheduler.Application.Trainings.Commands.CreateTraining;
using Scheduler.Domain.Entities;
using Scheduler.Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Trainings.Commands
{
    public class CreateTrainingCommandHandlerTests : DisconnectedStateTestBase
    {
        [Fact]
        public async Task Handler_SuccessfullyPersistsTraining()
        {
            int trainingId;
            Training training;
            var command = new CreateTrainingCommand
            {
                Description = "Learning to do stuff",
                Location = "The learning place",
                Start = new DateTime(2019, 11, 1, 8, 0, 0),
                End = new DateTime(2019, 11, 1, 17, 0, 0)
            };

            using (var context = new SchedulerDbContext(options))
            {
                var handler = new CreateTrainingCommandHandler(context);
                trainingId = await handler.Handle(command, CancellationToken.None);
            }

            using (var context = new SchedulerDbContext(options))
            {
                training = context.Training.Find(trainingId);
            }

            Assert.NotNull(training);
            Assert.Equal(trainingId, training.Id);
        }
    }
}
