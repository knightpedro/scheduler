using MediatR;

namespace Scheduler.Application.Workers.Queries.GetWorkersList
{
    public class GetWorkersListQuery : IRequest<WorkersListVm> 
    {
    }
}
