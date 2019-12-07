using Scheduler.Domain.Entities;
using System;

namespace Scheduler.Application.Workers.Queries.GetWorkersCalendar
{
    public class LeaveDto
    {
        public int Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public LeaveDto(Leave leave)
        {
            Id = leave.Id;
            Start = leave.LeavePeriod.Start;
            End = leave.LeavePeriod.End;
        }
    }
}
