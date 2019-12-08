using Moq;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Jobs.Queries.GetJobDetail;
using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Jobs.Queries
{
    public class GetJobDetailQueryHandlerTests
    {
        private readonly Mock<IJobRepository> mockRepo;

        public GetJobDetailQueryHandlerTests()
        {
            mockRepo = new Mock<IJobRepository>();
        }

        [Fact]
        public async Task Handler_ReturnsCorrectViewModel()
        {
            var expectedJob = GetJob();
            var query = new GetJobDetailQuery { Id = 1 };
            mockRepo.Setup(x => x.GetJobDetail(query.Id)).ReturnsAsync(expectedJob);
            var handler = new GetJobDetailQueryHandler(mockRepo.Object);

            var vm = await handler.Handle(query, CancellationToken.None);

            mockRepo.Verify(x => x.GetJobDetail(query.Id), Times.Once());
            Assert.Equal(expectedJob.Coordinator.Name, vm.Coordinator);
            Assert.Equal(expectedJob.JobTasks.Count(), vm.JobTasks.Count());
        }

        [Fact]
        public async Task Handler_ReturnsEmptyCoordinatorName_WhenCoordinatorIsNull()
        {
            var expectedJob = new Job();
            var query = new GetJobDetailQuery { Id = 1 };
            mockRepo.Setup(x => x.GetJobDetail(query.Id)).ReturnsAsync(expectedJob);
            var handler = new GetJobDetailQueryHandler(mockRepo.Object);

            var vm = await handler.Handle(query, CancellationToken.None);

            mockRepo.Verify(x => x.GetJobDetail(query.Id), Times.Once());
            Assert.Equal(string.Empty, vm.Coordinator);
        }

        [Fact]
        public async Task Handler_ThrowsNotFoundException_JobDoesNotExist()
        {
            var query = new GetJobDetailQuery { Id = 1 };
            var handler = new GetJobDetailQueryHandler(mockRepo.Object);

            await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(query, CancellationToken.None));
        }

        private Job GetJob()
        {
            var job = new Job();
            job.Coordinator = new Coordinator { Name = "Test Coordinator" };
            foreach(var task in GetJobTasks())
            {
                job.JobTasks.Add(task);
            }
            return job;
        } 

        private IEnumerable<JobTask> GetJobTasks()
        {
            return Enumerable.Range(1, 3).Select(i => new JobTask { Description = $"Task {i}" });
        }
    }
}
