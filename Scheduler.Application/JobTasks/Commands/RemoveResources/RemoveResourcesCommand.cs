using MediatR;
using System.Collections.Generic;

namespace Scheduler.Application.JobTasks.Commands.RemoveResources
{
    public class RemoveResourcesCommand : IRequest
    {
        public int JobTaskId { get; set; }
        public IEnumerable<int> ResourceIds { get; set; }
    }
}
