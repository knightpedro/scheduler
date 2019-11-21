using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Queries.GetWorkersList
{
    public class GetWorkersListQueryHandler : IRequestHandler<GetWorkersListQuery, WorkersListVm>
    {
        private readonly IRepository<Worker> _repo;

        public GetWorkersListQueryHandler(IRepository<Worker> repo)
        {
            _repo = repo;
        }

        public async Task<WorkersListVm> Handle(GetWorkersListQuery request, CancellationToken cancellationToken)
        {
            var workers = await _repo.GetAll(request.PageNumber, request.PageSize);
            return new WorkersListVm(workers);
        }
    }
}
