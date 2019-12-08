using MediatR;

namespace Scheduler.Application.Coordinators.Queries.GetCoordinatorDetail
{
    public class GetCoordinatorDetailQuery : IRequest<CoordinatorDetailVm>
    {
        public int Id { get; set; }
    }
}
