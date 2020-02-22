using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Jobs.Commands.CreateJob
{
    public class CreateJobCommandHandler : IRequestHandler<CreateJobCommand, int>
    {
        private readonly IJobRepository _repo;

        public CreateJobCommandHandler(IJobRepository repo)
        {
            _repo = repo;
        }

        public async Task<int> Handle(CreateJobCommand request, CancellationToken cancellationToken)
        {
            var job = new Job
            {
                JobNumber = request.JobNumber,
                Description = request.Description,
                Location = request.Location,
                CoordinatorId = request.CoordinatorId,
                DateReceived = request.DateReceived,
                DateScheduled = request.DateScheduled,
            };

            await _repo.Add(job);
            return job.Id;
        }
    }
}
