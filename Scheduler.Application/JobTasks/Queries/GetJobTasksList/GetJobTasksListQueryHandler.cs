using MediatR;
using Scheduler.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.JobTasks.Queries.GetJobTasksList
{
    public class GetJobTasksListQueryHandler : IRequestHandler<GetJobTasksListQuery, JobTasksListVm>
    {
        private readonly IJobTaskRepository _repo;

        public GetJobTasksListQueryHandler(IJobTaskRepository repo)
        {
            _repo = repo;
        }

        public async Task<JobTasksListVm> Handle(GetJobTasksListQuery request, CancellationToken cancellationToken)
        {
            var jobTasks = await _repo.GetAll(j => j.WorkerShifts, j => j.ResourceShifts);
            return new JobTasksListVm(jobTasks);
        }
    }
}
