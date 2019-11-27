using System.Collections.Generic;

namespace Scheduler.Application.Conflicts.Queries.GetWorkerConflicts
{
    public class WorkerConflictsVm
    {
        public IEnumerable<WorkerConflictDto> Conflicts { get; set; }

        public WorkerConflictsVm(IEnumerable<WorkerConflictDto> conflicts)
        {
            Conflicts = conflicts;
        }
    }
}
