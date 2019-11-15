using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Trainings.Queries.GetTrainingDetail
{
    public class GetTrainingDetailQueryHandler : IRequestHandler<GetTrainingDetailQuery, TrainingDetailVm>
    {
        private readonly ISchedulerDbContext _context;

        public GetTrainingDetailQueryHandler(ISchedulerDbContext context)
        {
            _context = context;
        }

        public async Task<TrainingDetailVm> Handle(GetTrainingDetailQuery request, CancellationToken cancellationToken)
        {
            var training = await _context.Training
                .Include(t => t.WorkerTraining)
                .ThenInclude(wt => wt.Worker)
                .SingleOrDefaultAsync(t => t.Id == request.Id);

            if (training is null)
                throw new NotFoundException(nameof(Training), request.Id);

            return new TrainingDetailVm(training);
        }
    }
}
