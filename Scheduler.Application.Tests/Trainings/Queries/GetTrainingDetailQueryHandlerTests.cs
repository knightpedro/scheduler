using Moq;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Trainings.Queries.GetTrainingDetail;
using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Trainings.Queries
{
    public class GetTrainingDetailQueryHandlerTests
    {
        private readonly Mock<ITrainingRepository> mockRepo;

        public GetTrainingDetailQueryHandlerTests()
        {
            mockRepo = new Mock<ITrainingRepository>();
        }

        [Fact]
        public async Task Handler_ReturnsCorrectViewModel()
        {
            var trainingId = 1;
            var expectedTraining = GetTrainingWithWorkers();
            mockRepo.Setup(x => x.GetTrainingWithWorkers(trainingId)).ReturnsAsync(expectedTraining);
            var query = new GetTrainingDetailQuery { Id = trainingId };
            var handler = new GetTrainingDetailQueryHandler(mockRepo.Object);

            var viewModel = await handler.Handle(query, CancellationToken.None);

            Assert.Equal(expectedTraining.Description, viewModel.Description);
            Assert.Equal(expectedTraining.Location, viewModel.Location);
            Assert.Equal(expectedTraining.WorkerTraining.Count, viewModel.Workers.Count());
            mockRepo.Verify(x => x.GetTrainingWithWorkers(query.Id), Times.Once());
        }

        [Fact]
        public async Task Handler_ReturnsEmptyCollection_WhenNoWorkersAssigned()
        {
            var expectedTraining = GetTrainingWithoutWokrkers();
            var trainingId = 1;
            mockRepo.Setup(x => x.GetTrainingWithWorkers(trainingId)).ReturnsAsync(expectedTraining);
            var query = new GetTrainingDetailQuery { Id = trainingId };
            var handler = new GetTrainingDetailQueryHandler(mockRepo.Object);

            var viewModel = await handler.Handle(query, CancellationToken.None);

            Assert.NotNull(viewModel.Workers);
            Assert.Empty(viewModel.Workers);
            mockRepo.Verify(x => x.GetTrainingWithWorkers(query.Id), Times.Once());
        }

        [Fact]
        public async Task Handler_ThrowsNotFoundException_WhenTrainingDoesNotExist()
        {
            var trainingId = 1;
            Training nullTraining = null;
            mockRepo.Setup(x => x.GetTrainingWithWorkers(trainingId)).ReturnsAsync(nullTraining);
            var query = new GetTrainingDetailQuery { Id = trainingId };
            var handler = new GetTrainingDetailQueryHandler(mockRepo.Object);

            await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(query, CancellationToken.None));
        }

        private Training GetTrainingWithoutWokrkers()
        {
            return new Training
            {
                Description = "Test training",
                Location = "Training Room",
            };
        }

        private Training GetTrainingWithWorkers()
        {
            var training = new Training
            {
                Description = "Test training",
                Location = "Training Room",
            };
            var workerTraining = GetWorkerTraining(training);
            foreach(var wt in workerTraining)
            {
                training.WorkerTraining.Add(wt);
            }
            return training;
        }

        private ICollection<WorkerTraining> GetWorkerTraining(Training training)
        {
            var workers = GetWorkers();
            return workers.Select(w => new WorkerTraining
            {
                TrainingId = training.Id,
                Training = training,
                WorkerId = w.Id,
                Worker = w
            }).ToList();
        }

        private IEnumerable<Worker> GetWorkers()
        {
            return Enumerable.Range(1, 3).Select(i => new Worker { Name = $"Worker {i}" });
        }
    }
}
