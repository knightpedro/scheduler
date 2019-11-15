using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Trainings.Commands.RemoveWorkers
{
    public class RemoveWorkersCommand : IRequest
    {
        public int TrainingId { get; set; }
        public IEnumerable<int> WorkerIds { get; set; }
    }
}
