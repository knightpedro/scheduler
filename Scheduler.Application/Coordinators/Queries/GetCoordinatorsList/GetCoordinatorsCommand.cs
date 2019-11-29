using MediatR;

namespace Scheduler.Application.Coordinators.Queries.GetCoordinatorsList
{
    public class GetCoordinatorsCommand : IRequest<CoordinatorsListVm>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
