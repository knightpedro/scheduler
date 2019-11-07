using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Commands.DeleteWorker
{
    public class DeleteWorkerCommandHandler : IRequestHandler<DeleteWorkerCommand>
    {
        private readonly ISchedulerDbContext _context;

        public DeleteWorkerCommandHandler(ISchedulerDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteWorkerCommand request, CancellationToken cancellationToken)
        {
            var worker = await _context.Workers.FindAsync(request.Id);
            if (worker is null)
                throw new NotFoundException(nameof(Worker), request.Id);
            _context.Workers.Remove(worker);
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
