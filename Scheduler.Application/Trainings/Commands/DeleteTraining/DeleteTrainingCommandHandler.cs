using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Trainings.Commands.DeleteTraining
{
    public class DeleteTrainingCommandHandler : IRequestHandler<DeleteTrainingCommand>
    {
        private readonly ISchedulerDbContext _context;

        public DeleteTrainingCommandHandler(ISchedulerDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteTrainingCommand request, CancellationToken cancellationToken)
        {
            var training = await _context.Training.FindAsync(request.TrainingId);
            if (training is null)
                throw new NotFoundException(nameof(Training), request.TrainingId);

            _context.Training.Remove(training);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
