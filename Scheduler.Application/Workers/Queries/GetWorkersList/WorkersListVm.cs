using System.Collections.Generic;

namespace Scheduler.Application.Workers.Queries.GetWorkersList
{
    public class WorkersListVm
    {
        public IList<WorkerDto> Workers { get; set;}
    }
}
