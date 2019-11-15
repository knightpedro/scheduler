using Scheduler.Application.Tests.Common;
using Scheduler.Application.Trainings.Queries.GetTrainingDetail;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using Scheduler.Persistence;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Trainings.Queries
{
    public class GetTrainingDetailQueryHandlerTests : DisconnectedStateTestBase
    {
        [Fact]
        public async Task Handler_ReturnsCorrectViewModel()
        {
            SeedTrainingSessionWithWorkers();
            var trainingId = 1;
            var query = new GetTrainingDetailQuery { Id = trainingId };
            TrainingDetailVm vm = null;
            using (var context = new SchedulerDbContext(options))
            {
                var handler = new GetTrainingDetailQueryHandler(context);
                vm = await handler.Handle(query, CancellationToken.None);
            }
            Assert.Equal(trainingId, vm.Id);
            Assert.NotNull(vm.Workers);
        }

        [Fact]
        public async Task Handler_HandlesTrainingSessionWithNoWorkers()
        {
            SeedEmptyTrainingSession();
            var trainingId = 1;
            var query = new GetTrainingDetailQuery { Id = trainingId };
            TrainingDetailVm vm = null;
            using (var context = new SchedulerDbContext(options))
            {
                var handler = new GetTrainingDetailQueryHandler(context);
                vm = await handler.Handle(query, CancellationToken.None);
            }
            Assert.Equal(trainingId, vm.Id);
            Assert.NotNull(vm.Workers);
            Assert.Empty(vm.Workers);
        }

        private void SeedTrainingSessionWithWorkers()
        {
            var workers = Enumerable.Range(1, 10).Select(i => new Worker { Name = $"Worker {i}" });
            var training = new Training
            {
                Description = "Test Training",
                Location = "Training Room",
                TrainingPeriod = new DateTimeRange(DateTime.Today, DateTime.Today.AddDays(1))
            };

            using (var context = new SchedulerDbContext(options))
            {
                var workerTraining = workers.Select(w => new WorkerTraining
                {
                    Training = training,
                    Worker = w
                });

                context.WorkerTraining.AddRange(workerTraining);
                context.SaveChanges();
            }
        }

        private void SeedEmptyTrainingSession()
        {
            var training = new Training
            {
                Description = "Test Training",
                Location = "Training Room",
                TrainingPeriod = new DateTimeRange(DateTime.Today, DateTime.Today.AddDays(1))
            };

            using (var context = new SchedulerDbContext(options))
            {
                context.Training.Add(training);
                context.SaveChanges();
            }
        }
    }
}
