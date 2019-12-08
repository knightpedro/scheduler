using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Coordinators.Queries.GetCoordinatorDetail
{
    public class GetCoordinatorDetailQueryHandler : IRequestHandler<GetCoordinatorDetailQuery, CoordinatorDetailVm>
    {
        private readonly IRepository<Coordinator> _repo;

        public GetCoordinatorDetailQueryHandler(IRepository<Coordinator> repo)
        {
            _repo = repo;
        }

        public async Task<CoordinatorDetailVm> Handle(GetCoordinatorDetailQuery request, CancellationToken cancellationToken)
        {
            var coordinator = await _repo.GetById(request.Id);
            if (coordinator is null)
                throw new NotFoundException(nameof(Coordinator), request.Id);

            return new CoordinatorDetailVm(coordinator);
        }
    }
}
