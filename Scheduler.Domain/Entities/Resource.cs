using Scheduler.Domain.Common;
using System.Collections.Generic;

namespace Scheduler.Domain.Entities
{
    public class Resource : Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }

        public IEnumerable<ResourceOutOfService> OutOfServices { get; private set; }

        public Resource()
        {
            OutOfServices = new HashSet<ResourceOutOfService>();
        }
    }
}
