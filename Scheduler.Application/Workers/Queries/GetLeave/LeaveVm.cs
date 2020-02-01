using Scheduler.Domain.Entities;
using System;

namespace Scheduler.Application.Workers.Queries.GetLeave
{
    public class LeaveVm
    {
        public int Id { get; set; }
        public int WorkerId { get; set; }
        public string LeaveType { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public LeaveVm(Leave leave)
        {
            Id = leave.Id;
            WorkerId = leave.WorkerId;
            LeaveType = leave.LeaveCategory.ToString();
            Start = leave.LeavePeriod.Start;
            End = leave.LeavePeriod.End;
        }
    }
}
