using Scheduler.Domain.Common;
using System;
using System.Collections.Generic;

namespace Scheduler.Domain.Entities
{
    public class Training : Entity
    {
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }

        public IEnumerable<WorkerTraining> WorkerTraining { get; private set; }

        public Training()
        {
            WorkerTraining = new HashSet<WorkerTraining>();
        }
    }
}
