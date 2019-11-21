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
        private readonly ITrainingRepository _repo;

        public DeleteTrainingCommandHandler(ITrainingRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(DeleteTrainingCommand request, CancellationToken cancellationToken)
        {
            var training = await _repo.GetById(request.TrainingId);
            if (training is null)
                throw new NotFoundException(nameof(Training), request.TrainingId);

            await _repo.Remove(training);
            return Unit.Value;
        }
    }
}
