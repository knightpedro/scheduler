using MediatR;
using System;
using System.Collections.Generic;

namespace Scheduler.Application.Conflicts.Queries.GetWorkersConflicts
{
    public class GetWorkersConflictsQuery : IRequest<IEnumerable<EntityConflictsVm>>
    {
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
    }
}
