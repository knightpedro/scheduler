using MediatR;

namespace Scheduler.Application.JobTasks.Queries.GetJobTasksList
{
    public class GetJobTasksListQuery : IRequest<JobTasksListVm>
    {
    }
}
