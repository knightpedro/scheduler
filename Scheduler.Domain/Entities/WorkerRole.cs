using System;

namespace Scheduler.Domain.Entities
{
    public class WorkerRole
    {
        public int RoleId { get; set; }
        public Role Role { get; set; }

        public int WorkerId { get; set; }
        public Worker Worker { get; set; }

        public DateTime? StartedRole { get; set; }
        public DateTime? EndedRole { get; set; }
    }
}
