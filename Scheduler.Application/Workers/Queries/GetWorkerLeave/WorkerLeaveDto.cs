using Scheduler.Domain.Entities;
using System;

namespace Scheduler.Application.Workers.Queries.GetWorkerLeave
{
    public class WorkerLeaveDto
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string LeaveType { get; set; }

        public WorkerLeaveDto(Leave leave)
        {
            Start = leave.LeavePeriod.Start;
            End = leave.LeavePeriod.End;
            LeaveType = leave.LeaveCategory.ToString();
        }
    }
}
