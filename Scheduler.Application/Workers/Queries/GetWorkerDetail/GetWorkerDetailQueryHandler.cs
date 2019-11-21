using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Queries.GetWorkerDetail
{
    public class GetWorkerDetailQueryHandler : IRequestHandler<GetWorkerDetailQuery, WorkerDetailVm>
    {
        private readonly IRepository<Worker> _repo;

        public GetWorkerDetailQueryHandler(IRepository<Worker> repo)
        {
            _repo = repo;
        }

        public async Task<WorkerDetailVm> Handle(GetWorkerDetailQuery request, CancellationToken cancellationToken)
        {
            var worker = await _repo.GetById(request.Id);

            if (worker is null)
                throw new NotFoundException(nameof(Worker), request.Id);

            return new WorkerDetailVm(worker);
        }
    }
}
