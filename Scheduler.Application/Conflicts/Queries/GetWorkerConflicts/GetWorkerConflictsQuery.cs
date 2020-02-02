﻿using MediatR;
using System;

namespace Scheduler.Application.Conflicts.Queries.GetWorkerConflicts
{
    public class GetWorkerConflictsQuery : IRequest<WorkerConflictsVm>
    {
        public int Id { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
    }
}
