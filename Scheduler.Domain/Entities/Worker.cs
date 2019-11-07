using Scheduler.Domain.Common;
using Scheduler.Domain.ValueObjects;
using System;
using System.Collections.Generic;

namespace Scheduler.Domain.Entities
{
    public class Worker : Entity
    {
        public string Name { get; set; }
        public bool IsActive { get; set; }

        public ICollection<Leave> Leave { get; private set; }
        public ICollection<WorkerCrew> WorkerCrews { get; private set; }
        public ICollection<WorkerRole> WorkerRoles { get; private set; }
        public ICollection<WorkerShift> WorkerShifts { get; private set; }
        public ICollection<WorkerTraining> WorkerTraining { get; private set; }

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
