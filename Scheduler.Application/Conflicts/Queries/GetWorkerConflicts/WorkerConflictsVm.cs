using Scheduler.Domain.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Conflicts.Queries.GetWorkerConflicts
{
    public class WorkerConflictsVm
    {
        public IEnumerable<ConflictDto> Conflicts { get; set; }

        public WorkerConflictsVm(IEnumerable<ConflictDto> conflicts)
        {
            Conflicts = conflicts;
        }
    }
}
