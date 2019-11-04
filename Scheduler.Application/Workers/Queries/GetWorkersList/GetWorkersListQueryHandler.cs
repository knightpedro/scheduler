using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Queries.GetWorkersList
{
    public class GetWorkersListQueryHandler : IRequestHandler<GetWorkersListQuery, WorkersListVm>
    {
        private readonly IMapper _mapper;
        private readonly ISchedulerDbContext _context;

        public GetWorkersListQueryHandler(ISchedulerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<WorkersListVm> Handle(GetWorkersListQuery request, CancellationToken cancellationToken)
        {
            var workers = await _context.Workers
                .ProjectTo<WorkerDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            var vm = new WorkersListVm { Workers = workers };
            return vm;
        }
    }
}
