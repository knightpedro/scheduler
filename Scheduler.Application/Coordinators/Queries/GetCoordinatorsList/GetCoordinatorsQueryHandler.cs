using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Coordinators.Queries.GetCoordinatorsList
{
    public class GetCoordinatorsQueryHandler : IRequestHandler<GetCoordinatorsQuery, CoordinatorsListVm>
    {
        private readonly IRepository<Coordinator> _repo;

        public GetCoordinatorsQueryHandler(IRepository<Coordinator> repo)
        {
            _repo = repo;
        }

        public async Task<CoordinatorsListVm> Handle(GetCoordinatorsQuery request, CancellationToken cancellationToken)
        {
            var coordinators = await _repo.GetAll();
            return new CoordinatorsListVm(coordinators);
        }
    }
}
