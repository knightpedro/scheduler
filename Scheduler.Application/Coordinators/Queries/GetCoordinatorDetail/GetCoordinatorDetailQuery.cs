using MediatR;

namespace Scheduler.Application.Coordinators.Queries.GetCoordinatorDetail
{
    public class GetCoordinatorDetailQuery : IRequest<CoordinatorDto>
    {
        public int Id { get; set; }
    }
}
