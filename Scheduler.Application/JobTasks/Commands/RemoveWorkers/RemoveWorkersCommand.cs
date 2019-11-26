using MediatR;
using System.Collections.Generic;

namespace Scheduler.Application.JobTasks.Commands.RemoveWorkers
{
    public class RemoveWorkersCommand : IRequest
    {
        public int JobTaskId { get; set; }
        public IEnumerable<int> WorkerIds { get; set; }
    }
}
