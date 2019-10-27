using Scheduler.Domain.Common;
using System;
using System.Collections.Generic;

namespace Scheduler.Domain.Entities
{
    public class Crew : Entity
    {
        public DateTime? DateFormed { get; set; }
        public DateTime? DateDisbanded { get; set; }

        public IEnumerable<WorkerCrew> WorkerCrews { get; private set; }

        public Crew()
        {
            WorkerCrews = new HashSet<WorkerCrew>();
        }
    }
}
