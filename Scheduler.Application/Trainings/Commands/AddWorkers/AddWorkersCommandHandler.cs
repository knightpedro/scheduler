using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Trainings.Commands.AddWorkers
{
    public class AddWorkersCommandHandler : IRequestHandler<AddWorkersCommand>
    {
        private readonly ISchedulerDbContext _context;

        public AddWorkersCommandHandler(ISchedulerDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(AddWorkersCommand request, CancellationToken cancellationToken)
        {
            var workerTraining = request.WorkerIds
                .Select(id => new WorkerTraining { WorkerId = id, TrainingId = request.TrainingId });

            _context.WorkerTraining.AddRange(workerTraining);
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }

        // Checks all entities exist before creating relationships.
        public async Task<Unit> HandleAlternative(AddWorkersCommand request, CancellationToken cancellationToken)
        {
            var training = await _context.Training.FindAsync(request.TrainingId);
            if (training is null)
                throw new NotFoundException(nameof(Training), request.TrainingId);

            foreach(var workerId in request.WorkerIds)
            {
                var worker = await _context.Workers.FindAsync(workerId);
                if (worker is null)
                    throw new NotFoundException(nameof(Worker), workerId);
            }

            var workerTraining = request.WorkerIds
                .Select(id => new WorkerTraining { WorkerId = id, TrainingId = request.TrainingId });

            _context.WorkerTraining.AddRange(workerTraining);
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
