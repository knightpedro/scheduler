using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Jobs.Commands.DeleteJob
{
    public class DeleteJobCommandHandler : IRequestHandler<DeleteJobCommand>
    {
        private readonly IJobRepository _repo;

        public DeleteJobCommandHandler(IJobRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(DeleteJobCommand request, CancellationToken cancellationToken)
        {
            var job = await _repo.GetById(request.Id);
            if (job is null)
                throw new NotFoundException(nameof(job), request.Id);

            await _repo.Remove(job);
            return Unit.Value;
        }
    }
}
