using MediatR;

namespace Scheduler.Application.Coordinators.Commands.DeleteCoordinator
{
    public class DeleteCoordinatorCommand : IRequest
    {
        public int Id { get; set; }
    }
}
