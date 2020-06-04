using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Conflicts.Queries.GetWorkersConflicts
{
    public class GetWorkersConflictsQueryHandler : IRequestHandler<GetWorkersConflictsQuery, IEnumerable<EntityConflictsVm>>
    {
        private readonly IConflictRepository _repo;

        public GetWorkersConflictsQueryHandler(IConflictRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<EntityConflictsVm>> Handle(GetWorkersConflictsQuery request, CancellationToken cancellationToken)
        {
            if (!request.Start.HasValue && !request.End.HasValue)
            {
                return await _repo.GetWorkersConflicts();
            }
 
            var start = request.Start ?? DateTime.MinValue;
            var end = request.End ?? DateTime.Now;
            var period = new DateTimeRange(start, end);
            return await _repo.GetWorkersConflicts(period);
        }
    }
}
