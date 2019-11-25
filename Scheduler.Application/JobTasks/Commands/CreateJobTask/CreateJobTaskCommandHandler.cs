using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.JobTasks.Commands.CreateJobTask
{
    public class CreateJobTaskCommandHandler : IRequestHandler<CreateJobTaskCommand, int>
    {
        private readonly IRepository<JobTask> _repo;

        public CreateJobTaskCommandHandler(IRepository<JobTask> repo)
        {
            _repo = repo;
        }

        public async Task<int> Handle(CreateJobTaskCommand request, CancellationToken cancellationToken)
        {
            var jobTask = new JobTask
            {
                JobId = request.JobId,
                Description = request.Description,
                TaskPeriod = new DateTimeRange(request.Start, request.End)
            };

            await _repo.Add(jobTask);
            return jobTask.Id;
        }
    }
}
