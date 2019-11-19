using MediatR;

namespace Scheduler.Application.Workers.Queries.GetWorkersList
{
    public class GetWorkersListQuery : IRequest<WorkersListVm> 
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
