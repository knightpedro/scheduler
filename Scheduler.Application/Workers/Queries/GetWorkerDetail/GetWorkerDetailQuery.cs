using MediatR;

namespace Scheduler.Application.Workers.Queries.GetWorkerDetail
{
    public class GetWorkerDetailQuery : IRequest<WorkerDetailVm>
    {
        public int Id { get; set; }
    }
}
