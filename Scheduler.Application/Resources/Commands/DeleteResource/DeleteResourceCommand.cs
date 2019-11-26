using MediatR;

namespace Scheduler.Application.Resources.Commands.DeleteResource
{
    public class DeleteResourceCommand : IRequest
    {
        public int Id { get; set; }
    }
}
