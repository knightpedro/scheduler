using Scheduler.Domain.Common;
using Scheduler.Domain.ValueObjects;
using System;
using System.Collections.Generic;

namespace Scheduler.Domain.Entities
{
    public class Crew : Entity
    {
        public DateTimeRange ActivePeriod { get; set; }

        public ICollection<WorkerCrew> WorkerCrews { get; private set; }

        public Crew()
        {
            ActivePeriod = new DateTimeRange(new DateTime(), new DateTime());
            WorkerCrews = new HashSet<WorkerCrew>();
        }
    }
}
