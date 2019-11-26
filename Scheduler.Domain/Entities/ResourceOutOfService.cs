using Scheduler.Domain.Common;
using Scheduler.Domain.ValueObjects;
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
        public DateTimeRange Period { get; set; }
        public ResourceOutOfServiceReason Reason { get; set; }
        public string Description { get; set; }

        public int ResourceId { get; set; }
        public Resource Resource { get; set; }

        public ResourceOutOfService()
        {
            Period = new DateTimeRange(new DateTime(), new DateTime());
        }
    }
}
