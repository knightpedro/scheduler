using MediatR;
using Scheduler.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Jobs.Queries.GetJobsList
{
    public class GetJobsListQueryHandler : IRequestHandler<GetJobsListQuery, JobsListVm>
    {
        protected readonly IJobRepository _repo;

        public GetJobsListQueryHandler(IJobRepository repo)
        {
            _repo = repo;
        }

        public async Task<JobsListVm> Handle(GetJobsListQuery request, CancellationToken cancellationToken)
        {
            var jobs = await _repo.GetAll(j => j.JobTasks);
            return new JobsListVm(jobs);
        }
    }
}
