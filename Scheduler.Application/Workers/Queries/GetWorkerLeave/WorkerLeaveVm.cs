﻿using System.Collections.Generic;

namespace Scheduler.Application.Workers.Queries.GetWorkerLeave
{
    public class WorkerLeaveVm
    {
        public IList<WorkerLeaveDto> Leave { get; set; }
    }
}
