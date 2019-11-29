using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Coordinators.Commands.CreateCoordinator
{
    public class CreateCoordinatorCommandHandler : IRequestHandler<CreateCoordinatorCommand, int>
    {
        private readonly IRepository<Coordinator> _repo;

        public CreateCoordinatorCommandHandler(IRepository<Coordinator> repo)
        {
            _repo = repo;
        }

        public async Task<int> Handle(CreateCoordinatorCommand request, CancellationToken cancellationToken)
        {
            var coordinator = new Coordinator
            {
                Name = request.Name,
                Email = request.Email,
                IsActive = true
            };
            await _repo.Add(coordinator);
            return coordinator.Id;
        }
    }
}
