using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Commands.DeleteLeave
{
    public class DeleteLeaveCommandHandler : IRequestHandler<DeleteLeaveCommand>
    {
        private readonly ISchedulerDbContext _context;

        public DeleteLeaveCommandHandler(ISchedulerDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteLeaveCommand request, CancellationToken cancellationToken)
        {
            var leave = await _context.Leave.FindAsync(request.LeaveId);
            if (leave is null)
                throw new NotFoundException(nameof(Leave), request.LeaveId);

            _context.Leave.Remove(leave);
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
