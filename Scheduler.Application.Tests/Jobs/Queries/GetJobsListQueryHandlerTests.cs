using Moq;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Jobs.Queries.GetJobsList;
using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Jobs.Queries
{
    public class GetJobsListQueryHandlerTests
    {
        private Mock<IJobRepository> mockRepo;

        public GetJobsListQueryHandlerTests()
        {
            mockRepo = new Mock<IJobRepository>();
        }

        [Fact]
        public async Task Handler_ReturnsCorrectViewModel()
        {
            var expectedJobs = GetJobs();
            var query = new GetJobsListQuery();
            mockRepo.Setup(x => x.GetAll(j => j.JobTasks)).ReturnsAsync(expectedJobs);
            var handler = new GetJobsListQueryHandler(mockRepo.Object);

            var vm = await handler.Handle(query, CancellationToken.None);

            mockRepo.Verify(x => x.GetAll(j => j.JobTasks), Times.Once());
            Assert.Equal(expectedJobs.Count(), vm.Jobs.Count());
        }

        private IEnumerable<Job> GetJobs()
        {
            return Enumerable.Range(1, 5).Select(i => new Job
            {
                JobNumber = i.ToString()
            });
        }
    }
}
