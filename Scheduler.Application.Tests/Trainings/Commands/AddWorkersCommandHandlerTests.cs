using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Tests.Common;
using Scheduler.Application.Trainings.Commands.AddWorkers;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using Scheduler.Persistence;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace Scheduler.Application.Tests.Trainings.Commands
{
    public class AddWorkersCommandHandlerTests : DisconnectedStateTestBase
    {
        [Fact]
        public async Task Handler_SuccessfullyAssignsTrainingToExistingWorkers()
        {
            var trainingId = SeedTraining();
            var workerIds = SeedTenWorkers();

            var command = new AddWorkersCommand
            {
                TrainingId = trainingId,
                WorkerIds = workerIds,
            };

            using (var context = new SchedulerDbContext(options))
            {
                var handler = new AddWorkersCommandHandler(context);
                await handler.Handle(command, CancellationToken.None);
            }

            IEnumerable<WorkerTraining> workerTraining;
            using (var context = new SchedulerDbContext(options))
            {
                workerTraining = context.WorkerTraining.ToList();
            }

            Assert.Equal(workerIds.Count(), workerTraining.Count());
        }

        [Fact]
        public async Task Handler_ThrowsDbUpdateException_TrainingDoesNotExist()
        {
            var workerIds = SeedTenWorkers();

            var command = new AddWorkersCommand
            {
                TrainingId = 1,
                WorkerIds = workerIds,
            };

            using (var context = new SchedulerDbContext(options))
            {
                var handler = new AddWorkersCommandHandler(context);
                await Assert.ThrowsAsync<DbUpdateException>(() => handler.Handle(command, CancellationToken.None));
            }
        }

        [Fact]
        public async Task Handler_ThrowsDbUpdateException_WorkerDoesNotExist()
        {
            var trainingId = SeedTraining();
            var workerIds = SeedTenWorkers();

            var command = new AddWorkersCommand
            {
                TrainingId = trainingId,
                WorkerIds = Enumerable.Range(1, 11),
            };

            using (var context = new SchedulerDbContext(options))
            {
                var handler = new AddWorkersCommandHandler(context);
                await Assert.ThrowsAsync<DbUpdateException>(() => handler.Handle(command, CancellationToken.None));
            }
        }

        private int SeedTraining()
        {
            var training = new Training
            {
                Description = "Riveting Discussion",
                Location = "Training Room",
                TrainingPeriod = new DateTimeRange(DateTime.Today, DateTime.Now)
            };
            using (var context = new SchedulerDbContext(options))
            {
                context.Training.Add(training);
                context.SaveChanges();
            }
            return training.Id;
        }

        private IEnumerable<int> SeedTenWorkers()
        {
            var workers = Enumerable.Range(1, 10).Select(i => new Worker { Name = $"Valued Worker {i}" });
            using (var context = new SchedulerDbContext(options))
            {
                context.Workers.AddRange(workers);
                context.SaveChanges();
            }
            return Enumerable.Range(1, 10);
        }
    }
}
