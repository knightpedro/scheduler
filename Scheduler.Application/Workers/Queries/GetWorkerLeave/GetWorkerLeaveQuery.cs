using MediatR;

namespace Scheduler.Application.Workers.Queries.GetWorkerLeave
{
    public class GetWorkerLeaveQuery : IRequest<WorkerLeaveVm>
    {
        public int WorkerId { get; set; }
    }
}
