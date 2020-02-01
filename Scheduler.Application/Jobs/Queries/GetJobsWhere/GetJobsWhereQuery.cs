using MediatR;

namespace Scheduler.Application.Jobs.Queries.GetJobsWhere
{
    public class GetJobsWhereQuery : IRequest<JobsListVm>
    {
        public int CoordinatorId { get; set; }
    }
}
