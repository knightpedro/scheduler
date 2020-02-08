using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Common.Models;
using Scheduler.Domain.ValueObjects;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Conflicts.Queries.GetResourceConflicts
{
    public class GetResourceConflictsQueryHandler : IRequestHandler<GetResourceConflictsQuery, ResourceConflictsVm>
    {
        private readonly IConflictRepository _repo;

        public GetResourceConflictsQueryHandler(IConflictRepository repo)
        {
            _repo = repo;
        }

        public async Task<ResourceConflictsVm> Handle(GetResourceConflictsQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Appointment> conflicts;
            if (request.Start.HasValue && request.End.HasValue)
                conflicts = await _repo.GetResourceConflicts(request.Id, new DateTimeRange(request.Start.Value, request.End.Value));
            else
                conflicts = await _repo.GetResourceConflicts(request.Id);
            return new ResourceConflictsVm(request.Id, conflicts);
        }
    }
}
