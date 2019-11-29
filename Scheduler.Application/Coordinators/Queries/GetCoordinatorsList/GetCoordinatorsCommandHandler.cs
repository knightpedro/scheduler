using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Coordinators.Queries.GetCoordinatorsList
{
    public class GetCoordinatorsCommandHandler : IRequestHandler<GetCoordinatorsCommand, CoordinatorsListVm>
    {
        private readonly IRepository<Coordinator> _repo;

        public GetCoordinatorsCommandHandler(IRepository<Coordinator> repo)
        {
            _repo = repo;
        }

        public async Task<CoordinatorsListVm> Handle(GetCoordinatorsCommand request, CancellationToken cancellationToken)
        {
            var coordinators = await _repo.GetAll();
            return new CoordinatorsListVm(coordinators);
        }
    }
}
