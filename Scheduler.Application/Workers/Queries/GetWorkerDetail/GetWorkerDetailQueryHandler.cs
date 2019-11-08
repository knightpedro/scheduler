using AutoMapper;
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
        private readonly ISchedulerDbContext _context;
        private readonly IMapper _mapper;

        public GetWorkerDetailQueryHandler(ISchedulerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<WorkerDetailVm> Handle(GetWorkerDetailQuery request, CancellationToken cancellationToken)
        {
            var worker = await _context.Workers.FindAsync(request.Id);

            if (worker is null)
                throw new NotFoundException(nameof(Worker), request.Id);

            return _mapper.Map<WorkerDetailVm>(worker);
        }
    }
}
