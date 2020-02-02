using System.Collections.Generic;

namespace Scheduler.Application.Conflicts.Queries
{
    public class WorkerConflictsVm
    {
        public int Id { get; set; }
        public IEnumerable<WorkerConflictDto> Conflicts { get; set; }

        public WorkerConflictsVm(int id, IEnumerable<WorkerConflictDto> conflicts)
        {
            Id = id;
            Conflicts = conflicts;
        }
    }
}
