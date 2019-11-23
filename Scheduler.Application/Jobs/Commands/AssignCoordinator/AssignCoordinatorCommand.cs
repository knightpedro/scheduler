using MediatR;

namespace Scheduler.Application.Jobs.Commands.AssignCoordinator
{
    public class AssignCoordinatorCommand : IRequest
    {
        public int JobId { get; set; }
        public int CoordinatorId { get; set; }
    }
}
