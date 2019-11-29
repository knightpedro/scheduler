using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Coordinators.Commands.DeleteCoordinator
{
    public class DeleteCoordinatorCommandHandler : IRequestHandler<DeleteCoordinatorCommand>
    {
        private readonly IRepository<Coordinator> _repo;

        public DeleteCoordinatorCommandHandler(IRepository<Coordinator> repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(DeleteCoordinatorCommand request, CancellationToken cancellationToken)
        {
            var coordinator = await _repo.GetById(request.Id);
            if (coordinator is null)
                throw new NotFoundException(nameof(Coordinator), request.Id);

            await _repo.Remove(coordinator);
            return Unit.Value;
        }
    }
}
