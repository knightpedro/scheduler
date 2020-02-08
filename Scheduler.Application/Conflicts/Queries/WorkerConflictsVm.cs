using Scheduler.Application.Common.Models;
using System.Collections.Generic;

namespace Scheduler.Application.Conflicts.Queries
{
    public class WorkerConflictsVm
    {
        public int Id { get; set; }
        public IEnumerable<Appointment> Conflicts { get; set; }

        public WorkerConflictsVm(int id, IEnumerable<Appointment> conflicts)
        {
            Id = id;
            Conflicts = conflicts;
        }
    }
}
