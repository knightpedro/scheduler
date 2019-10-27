using Scheduler.Domain.Common;
using System;

namespace Scheduler.Domain.Entities
{
    public enum ResourceOutOfServiceReason
    {
        Certification,
        Damage,
        Maintenance
    }

    public class ResourceOutOfService : Entity
    {
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public ResourceOutOfServiceReason Reason { get; set; }

        public int ResourceId { get; set; }
        public Resource Resource { get; set; }
    }
}
