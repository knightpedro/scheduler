using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Jobs.Commands.EditJob
{
    public class EditJobCommandHandler : IRequestHandler<EditJobCommand>
    {
        private readonly IJobRepository _repo;

        public EditJobCommandHandler(IJobRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(EditJobCommand request, CancellationToken cancellationToken)
        {
            var job = await _repo.GetById(request.Id);
            if (job is null)
                throw new NotFoundException(nameof(Job), request.Id);

            job.JobNumber = request.JobNumber;
            job.Description = request.Description;
            job.Location = request.Location;
            job.DateReceived = request.DateReceived;
            job.DateScheduled = request.DateScheduled;
            job.IsComplete = request.IsComplete;

            await _repo.Update(job);
            return Unit.Value;
        }
    }
}
