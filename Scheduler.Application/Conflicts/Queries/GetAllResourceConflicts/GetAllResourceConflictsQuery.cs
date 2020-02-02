using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Conflicts.Queries.GetAllResourceConflicts
{
    public class GetAllResourceConflictsQuery : IRequest<IEnumerable<ResourceConflictsVm>>
    {
    }
}
