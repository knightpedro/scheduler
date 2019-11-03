using Scheduler.Application.Common.Mappings;
using Scheduler.Domain.Entities;

namespace Scheduler.Application.Workers.Queries.GetWorkersList
{
    public class WorkerDto : IMapFrom<Worker>
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
