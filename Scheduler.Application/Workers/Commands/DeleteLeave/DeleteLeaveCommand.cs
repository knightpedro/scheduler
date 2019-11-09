using MediatR;

namespace Scheduler.Application.Workers.Commands.DeleteLeave
{
    public class DeleteLeaveCommand : IRequest
    {
        public int LeaveId { get; set; }
    }
}
