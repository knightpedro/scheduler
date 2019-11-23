using MediatR;

namespace Scheduler.Application.Jobs.Commands.DeleteJob
{
    public class DeleteJobCommand : IRequest
    {
        public int Id { get; set; }
    }
}
