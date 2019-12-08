using MediatR;

namespace Scheduler.Application.JobTasks.Queries.GetJobTaskDetail
{
    public class GetJobTaskDetailQuery : IRequest<JobTaskDetailVm>
    {
        public int Id { get; set; }
    }
}
