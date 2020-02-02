using MediatR;
using System;

namespace Scheduler.Application.Conflicts.Queries.GetResourceConflicts
{
    public class GetResourceConflictsQuery : IRequest<ResourceConflictsVm>
    {
        public int Id { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
    }
}
