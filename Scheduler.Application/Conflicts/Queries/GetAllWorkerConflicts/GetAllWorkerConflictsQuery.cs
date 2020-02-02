using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Conflicts.Queries.GetAllWorkerConflicts
{
    public class GetAllWorkerConflictsQuery : IRequest<IEnumerable<WorkerConflictsVm>>
    {
    }
}
