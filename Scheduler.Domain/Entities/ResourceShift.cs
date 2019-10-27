using System;

namespace Scheduler.Domain.Entities
{
    public class ResourceShift
    {
        public int ResourceId { get; set; }
        public Resource Resource { get; set; }

        public int JobTaskId { get; set; }
        public JobTask JobTask { get; set; }

        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
    }
}
