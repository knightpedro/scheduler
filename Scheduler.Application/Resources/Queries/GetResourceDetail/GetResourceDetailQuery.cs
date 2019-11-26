using MediatR;

namespace Scheduler.Application.Resources.Queries.GetResourceDetail
{
    public class GetResourceDetailQuery : IRequest<ResourceDetailVm>
    {
        public int Id { get; set; }
    }
}
