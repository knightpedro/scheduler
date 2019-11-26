using MediatR;
using System.Collections.Generic;

namespace Scheduler.Application.JobTasks.Commands.AssignResources
{
    public class AssignResourcesCommand : IRequest
    {
        public int JobTaskId { get; set; }
        public IEnumerable<int> ResourceIds { get; set; }
    }
}
