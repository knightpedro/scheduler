using MediatR;

namespace Scheduler.Application.Resources.Commands.EditResource
{
    public class EditResourceCommand : IRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
    }
}
