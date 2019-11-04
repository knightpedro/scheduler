using Scheduler.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Domain.Entities
{
    public class Job : Entity
    {
        public string JobNumber { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime? DateReceived { get; set; }
        public DateTime? DateScheduled { get; set; }
        public DateTime? PlannedStart { get; set; }
        public DateTime? ActualStart { get; set; }
        public DateTime? PlannedCompletion { get; set; }
        public DateTime? ActualCompletion { get; set; }

        public int? CoordinatorId { get; set; }
        public Coordinator Coordinator { get; set; }

        public IEnumerable<JobTask> JobTasks { get; private set; }

        public Job()
        {
            JobTasks = new HashSet<JobTask>();
        }
    }
}
