using MediatR;
using System;

namespace Scheduler.Application.Conflicts.Queries.GetConflictsForResource
{
    public class GetConflictsForResourceQuery : IRequest<EntityConflictsVm>
    {
        public int Id { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
    }
}
