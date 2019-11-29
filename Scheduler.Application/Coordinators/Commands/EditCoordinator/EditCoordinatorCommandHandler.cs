using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Coordinators.Commands.EditCoordinator
{
    public class EditCoordinatorCommandHandler : IRequestHandler<EditCoordinatorCommand>
    {
        private readonly IRepository<Coordinator> _repo;

        public EditCoordinatorCommandHandler(IRepository<Coordinator> repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(EditCoordinatorCommand request, CancellationToken cancellationToken)
        {
            var coordinator = await _repo.GetById(request.Id);
            if (coordinator is null)
                throw new NotFoundException(nameof(Coordinator), request.Id);

            coordinator.Name = request.Name;
            coordinator.Email = request.Email;
            coordinator.IsActive = request.IsActive;

            await _repo.Update(coordinator);
            return Unit.Value;
        }
    }
}
