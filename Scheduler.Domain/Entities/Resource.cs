using Scheduler.Domain.Common;
using System.Collections.Generic;

namespace Scheduler.Domain.Entities
{
    public class Resource : Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }

        public ICollection<ResourceOutOfService> OutOfServices { get; private set; }
        public ICollection<ResourceShift> ResourceShifts { get; private set; }

        public Resource()
        {
            OutOfServices = new HashSet<ResourceOutOfService>();
            ResourceShifts = new HashSet<ResourceShift>();
        }
    }
}
