using Scheduler.Domain.Common;
using System.Collections.Generic;

namespace Scheduler.Domain.Entities
{
    public class Coordinator : Entity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }

        public ICollection<Job> Jobs { get; private set; }

        public Coordinator()
        {
            Jobs = new HashSet<Job>();
        }
    }
}
