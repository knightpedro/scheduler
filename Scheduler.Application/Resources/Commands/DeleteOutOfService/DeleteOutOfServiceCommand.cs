using MediatR;

namespace Scheduler.Application.Resources.Commands.DeleteOutOfService
{
    public class DeleteOutOfServiceCommand : IRequest
    {
        public int Id { get; set; }
    }
}
