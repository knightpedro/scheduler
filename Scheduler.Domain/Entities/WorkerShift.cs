using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Domain.Entities
{
    public class WorkerShift
    {
        public int JobTaskId { get; set; }
        public JobTask JobTask { get; set; }

        public int WorkerId { get; set; }
        public Worker Worker { get; set; }

        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
    }
}
