using MediatR;

namespace Scheduler.Application.Jobs.Queries.GetJobsList
{
    public class GetJobsListQuery : IRequest<JobsListVm>
    {
    }
}
