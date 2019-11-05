using Scheduler.Domain.Common;
using Scheduler.Domain.ValueObjects;
using System;
using System.Collections.Generic;

namespace Scheduler.Domain.Entities
{
    public class JobTask : Entity
    {
        public string Description { get; set; }
        public DateTimeRange TaskPeriod { get; set; }

        public int JobId { get; set; }
        public Job Job { get; set; }

        public ICollection<ResourceShift> ResourceShifts { get; private set; }
        public ICollection<WorkerShift> WorkerShifts { get; private set; }

        public JobTask()
        {
            ResourceShifts = new HashSet<ResourceShift>();
            WorkerShifts = new HashSet<WorkerShift>();
        }
    }
}
