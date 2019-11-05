using Scheduler.Domain.Common;
using Scheduler.Domain.ValueObjects;

namespace Scheduler.Domain.Entities
{
    public enum LeaveType
    {
        Annual,
        Alternate,
        Bereavement,
        Parental,
        Sick
    }

    public class Leave : Entity
    {
        public DateTimeRange LeavePeriod { get; set; }
        public LeaveType LeaveType { get; set; }

        public int WorkerId { get; set; }
        public Worker Worker { get; set; }
    }
}
