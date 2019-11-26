using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.JobTasks.Commands.AssignWorkers
{
    public class AssignWorkersCommand : IRequest
    {
        public int JobTaskId { get; set; }
        public IEnumerable<int> WorkerIds { get; set; }
    }
}
