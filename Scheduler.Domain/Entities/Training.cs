using Scheduler.Domain.Common;
using Scheduler.Domain.ValueObjects;
using System;
using System.Collections.Generic;

namespace Scheduler.Domain.Entities
{
    public class Training : Entity
    {
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTimeRange TrainingPeriod { get; set; }

        public ICollection<WorkerTraining> WorkerTraining { get; private set; }

        public Training()
        {
            TrainingPeriod = new DateTimeRange(new DateTime(), new DateTime());
            WorkerTraining = new HashSet<WorkerTraining>();
        }
    }
}
