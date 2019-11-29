using MediatR;

namespace Scheduler.Application.Coordinators.Queries.GetCoordinatorsList
{
    public class GetCoordinatorsCommand : IRequest<CoordinatorsListVm>
    {
    }
}
