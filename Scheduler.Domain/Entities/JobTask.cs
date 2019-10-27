using Scheduler.Domain.Common;
using System;

namespace Scheduler.Domain.Entities
{
    public class JobTask : Entity
    {
        public string Description { get; set; }
        public DateTime? PlannedStart { get; set; }
        public DateTime? PlannedEnd { get; set; }
        public DateTime? ActualStart { get; set; }
        public DateTime? ActualEnd { get; set; }

        public int JobId { get; set; }
        public Job Job { get; set; }


    }
}
