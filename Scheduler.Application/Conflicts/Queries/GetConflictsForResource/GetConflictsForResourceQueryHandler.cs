﻿using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Conflicts.Queries.GetConflictsForResource
{
    public class GetConflictsForResourceQueryHandler : IRequestHandler<GetConflictsForResourceQuery, EntityConflictsVm>
    {
        private readonly IConflictRepository _repo;

        public GetConflictsForResourceQueryHandler(IConflictRepository repo)
        {
            _repo = repo;
        }

        public async Task<EntityConflictsVm> Handle(GetConflictsForResourceQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<ConflictDto> conflicts;
            if (!request.Start.HasValue && !request.End.HasValue)
            {
                conflicts = await _repo.GetConflictsForResource(request.Id);
            }
            else
            {
                var start = request.Start ?? DateTime.MinValue;
                var end = request.End ?? DateTime.Now;
                var period = new DateTimeRange(start, end);
                conflicts = await _repo.GetConflictsForResource(request.Id, period);
            }
            return new EntityConflictsVm
            {
                Id = request.Id,
                Conflicts = conflicts
            };
        }
    }
}
