using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Workers.Queries.GetWorkerLeave
{
    public class WorkerLeaveVm
    {
        public IList<WorkerLeaveDto> WorkerLeave { get; set; }
    }
}
