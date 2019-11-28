using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Commands.CreateLeave
{
    public class CreateLeaveCommandHandler : IRequestHandler<CreateLeaveCommand, int>
    {
        private readonly IRepository<Leave> _repo;

        public CreateLeaveCommandHandler(IRepository<Leave> repo)
        {
            _repo = repo;
        }

        public async Task<int> Handle(CreateLeaveCommand request, CancellationToken cancellationToken)
        {
            LeaveType leaveType;
            Enum.TryParse(request.LeaveType, true, out leaveType);

            var leave = new Leave
            {
                WorkerId = request.WorkerId,
                LeavePeriod = new DateTimeRange(request.Start, request.End),
                LeaveCategory = leaveType
            };

            await _repo.Add(leave);
            return leave.Id;  
        }
    }
}
