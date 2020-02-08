using Scheduler.Application.Workers.Queries.GetLeave;
using System.Collections.Generic;

namespace Scheduler.Application.Workers.Queries.GetLeaveList
{
    public class LeaveListVm
    {
        public IEnumerable<LeaveVm> Leave { get; set; }
    }
}
