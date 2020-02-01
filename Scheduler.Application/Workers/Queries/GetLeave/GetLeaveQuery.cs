using MediatR;

namespace Scheduler.Application.Workers.Queries.GetLeave
{
    public class GetLeaveQuery : IRequest<LeaveVm>
    {
        public int Id { get; set; }
    }
}
