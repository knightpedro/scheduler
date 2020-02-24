using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Trainings.Commands.EditTraining
{
    public class EditTrainingCommandHandler : IRequestHandler<EditTrainingCommand>
    {
        private readonly ITrainingRepository _repo;

        public EditTrainingCommandHandler(ITrainingRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(EditTrainingCommand request, CancellationToken cancellationToken)
        {
            var training = await _repo.GetById(request.Id);
            if (training is null)
                throw new NotFoundException(nameof(Training), request.Id);

            training.Description = request.Description;
            training.Location = request.Location;
            training.TrainingPeriod = new DateTimeRange(request.Start, request.End);

            await _repo.Update(training);
            return Unit.Value;
        }
    }
}
