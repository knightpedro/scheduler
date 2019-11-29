using MediatR;

namespace Scheduler.Application.Coordinators.Commands.CreateCoordinator
{
    public class CreateCoordinatorCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
