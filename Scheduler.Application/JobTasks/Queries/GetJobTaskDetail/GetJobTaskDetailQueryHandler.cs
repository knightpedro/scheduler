using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.JobTasks.Queries.GetJobTaskDetail
{
    public class GetJobTaskDetailQueryHandler : IRequestHandler<GetJobTaskDetailQuery, JobTaskVm>
    {
        public Task<JobTaskVm> Handle(GetJobTaskDetailQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
