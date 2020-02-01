using MediatR;
using Scheduler.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Jobs.Queries.GetJobsWhere
{
    public class GetJobsWhereQueryHandler : IRequestHandler<GetJobsWhereQuery, JobsListVm>
    {
        protected readonly IJobRepository _repo;

        public GetJobsWhereQueryHandler(IJobRepository repo)
        {
            _repo = repo;
        }

        public async Task<JobsListVm> Handle(GetJobsWhereQuery request, CancellationToken cancellationToken)
        {
            var jobs = await _repo.GetWhere(j => j.Coordinator.Id == request.CoordinatorId);
            return new JobsListVm(jobs);
        }
    }
}
