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
        public bool IsComplete { get; set; }

        public int? CoordinatorId { get; set; }
        public Coordinator Coordinator { get; set; }

        public ICollection<JobTask> JobTasks { get; private set; }

        public Job()
        {
            JobTasks = new HashSet<JobTask>();
        }
    }
}
