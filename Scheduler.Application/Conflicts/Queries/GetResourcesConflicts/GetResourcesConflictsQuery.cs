using MediatR;
using System;
using System.Collections.Generic;

namespace Scheduler.Application.Conflicts.Queries.GetResourcesConflicts
{
    public class GetResourcesConflictsQuery : IRequest<IEnumerable<EntityConflictsVm>>
    {
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
    }
}
