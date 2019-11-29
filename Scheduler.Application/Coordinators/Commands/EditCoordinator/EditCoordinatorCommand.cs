using MediatR;

namespace Scheduler.Application.Coordinators.Commands.EditCoordinator
{
    public class EditCoordinatorCommand : IRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
    }
}
