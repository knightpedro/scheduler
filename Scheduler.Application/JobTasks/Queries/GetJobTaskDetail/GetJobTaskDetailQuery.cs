using MediatR;

namespace Scheduler.Application.JobTasks.Queries.GetJobTaskDetail
{
    public class GetJobTaskDetailQuery : IRequest<JobTaskVm>
    {
        public int Id { get; set; }
    }
}
