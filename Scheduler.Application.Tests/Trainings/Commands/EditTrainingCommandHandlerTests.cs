using Scheduler.Application.Tests.Common;
using Scheduler.Application.Trainings.Commands.EditTraining;
using Scheduler.Domain.Entities;
using Scheduler.Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Trainings.Commands
{
    public class EditTrainingCommandHandlerTests : DisconnectedStateTestBase
    {
        [Fact]
        public async Task Handler_SuccessfullyUpdatesExistingTraining()
        {
            var trainingId = SeedTraining();
            var command = new EditTrainingCommand
            {
                TrainingId = trainingId,
                Description = "Updated Training",
                Location = "Board Room",
                Start = DateTime.Now,
                End = DateTime.Now,
            };

            using (var context = new SchedulerDbContext(options))
            {
                var handler = new EditTrainingCommandHandler(context);
                await handler.Handle(command, CancellationToken.None);
            }

            Training updatedTraining;
            using (var context = new SchedulerDbContext(options))
            {
                updatedTraining = context.Training.Find(trainingId);
            }

            Assert.Equal(command.Description, updatedTraining.Description);
            Assert.Equal(command.Location, updatedTraining.Location);
            Assert.Equal(command.Start, updatedTraining.TrainingPeriod.Start);
            Assert.Equal(command.End, updatedTraining.TrainingPeriod.End);
        }

        private int SeedTraining()
        {
            var training = new Training
            {
                Description = "Training Test",
                Location = "Test Room"
            };
            using (var context = new SchedulerDbContext(options))
            {
                context.Training.Add(training);
                context.SaveChanges();
            }
            return training.Id;
        }
    }
}
