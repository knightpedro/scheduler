using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Application.Workers.Queries.GetWorkersList
{
    public class WorkersListVm
    {
        public IEnumerable<WorkerDto> Workers { get; set;}

        public WorkersListVm(IEnumerable<Worker> workers)
        {
            Workers = workers.Select(w => new WorkerDto(w));
        }
    }
}
