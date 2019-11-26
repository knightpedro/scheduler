using MediatR;

namespace Scheduler.Application.Resources.Queries.GetResourcesList
{
    public class GetResourcesListQuery : IRequest<ResourcesListVm>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
