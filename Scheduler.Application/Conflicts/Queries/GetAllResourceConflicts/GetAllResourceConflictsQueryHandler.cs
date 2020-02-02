using MediatR;
using Scheduler.Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Conflicts.Queries.GetAllResourceConflicts
{
    public class GetAllResourceConflictsQueryHandler : IRequestHandler<GetAllResourceConflictsQuery, IEnumerable<ResourceConflictsVm>>
    {
        private readonly IConflictRepository _repo;

        public GetAllResourceConflictsQueryHandler(IConflictRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<ResourceConflictsVm>> Handle(GetAllResourceConflictsQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetResourceConflicts();
        }
    }
}
