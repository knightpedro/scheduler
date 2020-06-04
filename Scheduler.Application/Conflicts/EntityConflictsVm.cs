using System.Collections.Generic;

namespace Scheduler.Application.Conflicts
{
    public class EntityConflictsVm
    {
        public int Id { get; set; }
        public IEnumerable<ConflictDto> Conflicts { get; set; }
    }
}
