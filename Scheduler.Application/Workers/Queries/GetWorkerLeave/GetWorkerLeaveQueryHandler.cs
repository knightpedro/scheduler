using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Queries.GetWorkerLeave
{
    public class GetWorkerLeaveQueryHandler : IRequestHandler<GetWorkerLeaveQuery, WorkerLeaveVm>
    {
        private readonly ISchedulerDbContext _context;
        private readonly IMapper _mapper;

        public GetWorkerLeaveQueryHandler(ISchedulerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<WorkerLeaveVm> Handle(GetWorkerLeaveQuery request, CancellationToken cancellationToken)
        {
            var workerLeave = await _context.Leave.AsNoTracking()
                .Where(l => l.WorkerId == request.WorkerId)
                .ProjectTo<WorkerLeaveDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return new WorkerLeaveVm { WorkerLeave = workerLeave };
        }
    }
}
