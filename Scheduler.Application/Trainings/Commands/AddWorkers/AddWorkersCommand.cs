using MediatR;
using System.Collections.Generic;

namespace Scheduler.Application.Trainings.Commands.AddWorkers
{
    public class AddWorkersCommand : IRequest
    {
        public int TrainingId { get; set; }
        public IEnumerable<int> WorkerIds { get; set; }
    }
}
