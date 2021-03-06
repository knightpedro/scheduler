﻿using Scheduler.Domain.Common;
using Scheduler.Domain.ValueObjects;
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
        public DateTimeRange LeavePeriod { get; set; }
        public LeaveType LeaveCategory { get; set; }
   
        public int WorkerId { get; set; }
        public Worker Worker { get; set; }

        public Leave()
        {
            LeavePeriod = new DateTimeRange(new DateTime(), new DateTime());
        }
    }
}
