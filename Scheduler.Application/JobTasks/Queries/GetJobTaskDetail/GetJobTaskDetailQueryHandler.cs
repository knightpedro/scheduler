using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.JobTasks.Queries.GetJobTaskDetail
{
    public class GetJobTaskDetailQueryHandler : IRequestHandler<GetJobTaskDetailQuery, JobTaskDetailVm>
    {
        private readonly IJobTaskRepository _repo;

        public GetJobTaskDetailQueryHandler(IJobTaskRepository repo)
        {
            _repo = repo;
        }

        public async Task<JobTaskDetailVm> Handle(GetJobTaskDetailQuery request, CancellationToken cancellationToken)
        {
            var jobTask = await _repo.GetByIdWithShifts(request.Id);
            if (jobTask is null)
                throw new NotFoundException(nameof(JobTask), request.Id);
            return new JobTaskDetailVm(jobTask);
        }
    }
}
