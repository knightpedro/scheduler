using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Queries.GetWorkerLeave
{
    public class GetWorkerLeaveQueryHandler : IRequestHandler<GetWorkerLeaveQuery, WorkerLeaveVm>
    {
        private readonly IRepository<Worker> _repo;

        public GetWorkerLeaveQueryHandler(IRepository<Worker> repo)
        {
            _repo = repo;
        }

        public async Task<WorkerLeaveVm> Handle(GetWorkerLeaveQuery request, CancellationToken cancellationToken)
        {
            var worker = await _repo.FirstOrDefault(w => w.Id == request.WorkerId, w => w.Leave);
            if (worker is null)
                throw new NotFoundException(nameof(Worker), request.WorkerId);

            return new WorkerLeaveVm {
                WorkerLeave = worker.Leave.Select(l => new WorkerLeaveDto(l)).ToList()
            };
        }
    }
}
