using MediatR;

namespace Scheduler.Application.Jobs.Queries.GetJobsList
{
    public class GetJobsListQuery : IRequest<JobsListVm>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
