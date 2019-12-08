using MediatR;

namespace Scheduler.Application.Coordinators.Queries.GetCoordinatorsList
{
    public class GetCoordinatorsQuery : IRequest<CoordinatorsListVm>
    {
    }
}
