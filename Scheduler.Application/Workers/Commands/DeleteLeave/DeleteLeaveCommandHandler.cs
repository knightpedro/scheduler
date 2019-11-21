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
        private readonly IRepository<Leave> _repo;

        public DeleteLeaveCommandHandler(IRepository<Leave> repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(DeleteLeaveCommand request, CancellationToken cancellationToken)
        {
            var leave = await _repo.GetById(request.LeaveId);
            if (leave is null)
                throw new NotFoundException(nameof(Leave), request.LeaveId);

            await _repo.Remove(leave);
            return Unit.Value;
        }
    }
}
