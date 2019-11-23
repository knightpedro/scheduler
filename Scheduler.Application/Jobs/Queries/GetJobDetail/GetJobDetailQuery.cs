using MediatR;

namespace Scheduler.Application.Jobs.Queries.GetJobDetail
{
    public class GetJobDetailQuery : IRequest<JobDetailVm>
    {
        public int Id { get; set; }
    }
}
