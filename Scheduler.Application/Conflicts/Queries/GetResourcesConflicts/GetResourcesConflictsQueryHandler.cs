using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Conflicts.Queries.GetResourcesConflicts
{
    public class GetResourcesConflictsQueryHandler : IRequestHandler<GetResourcesConflictsQuery, IEnumerable<EntityConflictsVm>>
    {
        private readonly IConflictRepository _repo;

        public GetResourcesConflictsQueryHandler(IConflictRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<EntityConflictsVm>> Handle(GetResourcesConflictsQuery request, CancellationToken cancellationToken)
        {
            if (!request.Start.HasValue && !request.End.HasValue)
            {
                return await _repo.GetResourcesConflicts();
            }

            var start = request.Start ?? DateTime.MinValue;
            var end = request.End ?? DateTime.Now;
            var period = new DateTimeRange(start, end);
            return await _repo.GetResourcesConflicts(period);
        }
    }
}
