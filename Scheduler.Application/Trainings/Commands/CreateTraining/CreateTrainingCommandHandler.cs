using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Trainings.Commands.CreateTraining
{
    public class CreateTrainingCommandHandler : IRequestHandler<CreateTrainingCommand, int>
    {
        private readonly ITrainingRepository _repo;

        public CreateTrainingCommandHandler(ITrainingRepository repo)
        {
            _repo = repo;
        }

        public async Task<int> Handle(CreateTrainingCommand request, CancellationToken cancellationToken)
        {
            var training = new Training
            {
                Description = request.Description,
                Location = request.Location,
                TrainingPeriod = new DateTimeRange(request.Start, request.End),
            };

            await _repo.Add(training);
            return training.Id;
        }
    }
}
