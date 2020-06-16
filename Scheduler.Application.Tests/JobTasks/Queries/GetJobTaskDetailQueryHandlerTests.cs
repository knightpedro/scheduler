using Moq;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.JobTasks.Queries.GetJobTaskDetail;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.JobTasks.Queries
{
    public class GetJobTaskDetailQueryHandlerTests
    {
        private readonly Mock<IJobTaskRepository> mockRepo;

        public GetJobTaskDetailQueryHandlerTests()
        {
            mockRepo = new Mock<IJobTaskRepository>();
        }

        [Fact]
        public async Task Handler_ReturnsCorrectViewModel()
        {
            var jobTaskId = 1;
            var expectedTask = GetJobTask();
            var query = new GetJobTaskDetailQuery { Id = jobTaskId };
            mockRepo.Setup(x => x.GetByIdWithShifts(jobTaskId)).ReturnsAsync(expectedTask);
            var handler = new GetJobTaskDetailQueryHandler(mockRepo.Object);

            var vm = await handler.Handle(query, CancellationToken.None);

            mockRepo.Verify(x => x.GetByIdWithShifts(jobTaskId), Times.Once());
            Assert.NotNull(vm);
            Assert.Equal(vm.Description, expectedTask.Description);
            Assert.Equal(vm.Start, expectedTask.TaskPeriod.Start);
            Assert.Equal(vm.End, expectedTask.TaskPeriod.End);
            Assert.Equal(expectedTask.WorkerShifts.Count, vm.Workers.Count());
            Assert.Equal(expectedTask.ResourceShifts.Count, vm.Resources.Count());
        }

        private JobTask GetJobTask()
        {
            var jobTask = new JobTask
            {
                Description = "Doing a thing",
                TaskPeriod = new DateTimeRange(DateTime.Now, DateTime.Now.AddHours(8)),
                Job = new Job()
            };

            var workerShifts = Enumerable.Range(1, 3).Select(i => new WorkerShift());
            foreach(var shift in workerShifts)
            {
                shift.Worker = new Worker();
                jobTask.WorkerShifts.Add(shift);
            }

            var resourceShifts = Enumerable.Range(1, 2).Select(i => new ResourceShift());
            foreach (var shift in resourceShifts)
            {
                shift.Resource = new Resource();
                jobTask.ResourceShifts.Add(shift);
            }

            return jobTask;
        }

    }
}
