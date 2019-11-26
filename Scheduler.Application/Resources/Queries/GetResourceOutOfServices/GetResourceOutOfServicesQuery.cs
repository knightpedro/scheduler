using MediatR;

namespace Scheduler.Application.Resources.Queries.GetResourceOutOfServices
{
    public class GetResourceOutOfServicesQuery : IRequest<ResourceOutOfServicesListVm>
    {
        public int ResourceId { get; set; }
    }
}
