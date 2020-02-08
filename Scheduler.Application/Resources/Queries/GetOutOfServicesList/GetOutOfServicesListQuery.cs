using MediatR;

namespace Scheduler.Application.Resources.Queries.GetOutOfServicesList
{
    public class GetOutOfServicesListQuery : IRequest<OutOfServicesListVm>
    {
    }
}
