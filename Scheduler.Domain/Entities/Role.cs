using Scheduler.Domain.Common;
using System.Collections.Generic;

namespace Scheduler.Domain.Entities
{
    public enum RoleType
    {
        Trainee,
        Supervisor,
        LeadingHand
    }

    public class Role : Entity
    {
        public RoleType RoleType { get; set; }
        public ICollection<WorkerRole> WorkerRoles { get; private set; }

        public Role()
        {
            WorkerRoles = new HashSet<WorkerRole>();
        }
    }
}
