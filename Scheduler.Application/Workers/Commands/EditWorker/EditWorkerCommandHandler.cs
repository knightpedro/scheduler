using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Commands.EditWorker
{
    public class EditWorkerCommandHandler : IRequestHandler<EditWorkerCommand>
    {
        private readonly IRepository<Worker> _repo;

        public EditWorkerCommandHandler(IRepository<Worker> repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(EditWorkerCommand request, CancellationToken cancellationToken)
        {
            var worker = await _repo.GetById(request.Id);
            if (worker is null)
                throw new NotFoundException(nameof(Worker), request.Id);

            worker.Name = request.Name;
            worker.IsActive = request.IsActive;

            await _repo.Update(worker);
            return Unit.Value;
        }
    }
}
