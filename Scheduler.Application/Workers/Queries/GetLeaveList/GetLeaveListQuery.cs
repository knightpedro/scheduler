using MediatR;

namespace Scheduler.Application.Workers.Queries.GetLeaveList
{
    public class GetLeaveListQuery : IRequest<LeaveListVm>
    {
    }
}
