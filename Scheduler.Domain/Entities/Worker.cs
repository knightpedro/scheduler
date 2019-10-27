using Scheduler.Domain.Common;
using System;
using System.Collections.Generic;

namespace Scheduler.Domain.Entities
{
    public class Worker : Entity
    {
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public DateTime? JoinedCompany { get; set; }
        public DateTime? LeftCompany { get; set; }

        public IEnumerable<Leave> Leave { get; private set; }
        public IEnumerable<WorkerCrew> WorkerCrews { get; private set; }
        public IEnumerable<WorkerRole> WorkerRoles { get; private set; }
        public IEnumerable<WorkerShift> WorkerShifts { get; private set; }
        public IEnumerable<WorkerTraining> WorkerTraining { get; private set; }

        public Worker()
        {
            Leave = new HashSet<Leave>();
            WorkerCrews = new HashSet<WorkerCrew>();
            WorkerRoles = new HashSet<WorkerRole>();
            WorkerShifts = new HashSet<WorkerShift>();
            WorkerTraining = new HashSet<WorkerTraining>();
        }
    }
}
