using Scheduler.Domain.Common;
using System;

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
        public DateTime? Start { get; private set; }
        public DateTime? End { get; private set; }
        public LeaveType LeaveType { get; private set; }

        public int WorkerId { get; set; }
        public Worker Worker { get; set; }

        private Leave() { }

        public Leave(DateTime start, DateTime end, LeaveType leaveType)
        {
            Start = start;
            End = end;
            LeaveType = leaveType;
        }
    }
}
