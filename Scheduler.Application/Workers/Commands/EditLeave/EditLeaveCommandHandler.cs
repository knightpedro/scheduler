using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Commands.EditLeave
{
    public class EditLeaveCommandHandler : IRequestHandler<EditLeaveCommand>
    {
        private readonly IRepository<Leave> _repo;

        public EditLeaveCommandHandler(IRepository<Leave> repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(EditLeaveCommand request, CancellationToken cancellationToken)
        {
            var leave = await _repo.GetById(request.Id);
            if (leave is null )
                throw new NotFoundException(nameof(Leave), request.Id);

            LeaveType leaveType;
            Enum.TryParse(request.LeaveType, true, out leaveType);

            leave.WorkerId = request.WorkerId;
            leave.LeavePeriod = new DateTimeRange(request.Start, request.End);
            leave.LeaveCategory = leaveType;

            await _repo.Update(leave);
            return Unit.Value;
        }
    }
}
