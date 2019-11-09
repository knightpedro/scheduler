using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Training.Queries.GetTrainingList
{
    public class GetTrainingListQueryHandler : IRequestHandler<GetTrainingListQuery, TrainingListVm>
    {
        private readonly ISchedulerDbContext _context;
        private readonly IMapper _mapper;

        public GetTrainingListQueryHandler(ISchedulerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<TrainingListVm> Handle(GetTrainingListQuery request, CancellationToken cancellationToken)
        {
            var training = await _context.Training.AsNoTracking()
                .ProjectTo<TrainingDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return new TrainingListVm() { Training = training };
        }
    }
}
