using Scheduler.Domain.Entities;
using System;

namespace Scheduler.Application.Calendar.Queries
{
    public class LeaveDto
    {
        public int Id { get; set; }
        public string LeaveType { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public LeaveDto(Leave leave)
        {
            Id = leave.Id;
            LeaveType = leave.LeaveCategory.ToString();
            Start = leave.LeavePeriod.Start;
            End = leave.LeavePeriod.End;
        }
    }
}
