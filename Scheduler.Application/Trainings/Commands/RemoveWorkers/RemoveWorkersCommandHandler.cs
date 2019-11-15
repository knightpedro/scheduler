using MediatR;
using Scheduler.Application.Common.Interfaces;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Trainings.Commands.RemoveWorkers
{
    public class RemoveWorkersCommandHandler : IRequestHandler<RemoveWorkersCommand>
    {
        private readonly ISchedulerDbContext _context;

        public RemoveWorkersCommandHandler(ISchedulerDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(RemoveWorkersCommand request, CancellationToken cancellationToken)
        {
            var workerTraining = _context.WorkerTraining
                .Where(w => w.TrainingId == request.TrainingId)
                .ToList();

            var workerTrainingToRemove = workerTraining.Where(w => request.WorkerIds.Contains(w.WorkerId));

            _context.WorkerTraining.RemoveRange(workerTrainingToRemove);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
