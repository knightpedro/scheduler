using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Commands.DeleteWorker
{
    public class DeleteWorkerCommandHandler : IRequestHandler<DeleteWorkerCommand>
    {
        private readonly IRepository<Worker> _repo;

        public DeleteWorkerCommandHandler(IRepository<Worker> repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(DeleteWorkerCommand request, CancellationToken cancellationToken)
        {
            var worker = await _repo.GetById(request.Id);
            if (worker is null)
                throw new NotFoundException(nameof(Worker), request.Id);

            await _repo.Remove(worker);
            return Unit.Value;
        }
    }
}
