using MediatR;
using System;

namespace Scheduler.Application.Conflicts.Queries.GetWorkerConflicts
{
    public class GetWorkerConflictsQuery : IRequest<WorkerConflictsVm>
    {
        public int WorkerId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
