using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Conflicts.Queries
{
    public class ResourceConflictsVm
    {
        public int Id { get; set; }
        public IEnumerable<ResourceConflictDto> Conflicts { get; set; }

        public ResourceConflictsVm(int id, IEnumerable<ResourceConflictDto> conflicts)
        {
            Id = id;
            Conflicts = conflicts;

        }
    }
}
