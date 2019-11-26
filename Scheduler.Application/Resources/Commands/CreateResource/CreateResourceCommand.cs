using MediatR;

namespace Scheduler.Application.Resources.Commands.CreateResource
{
    public class CreateResourceCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
