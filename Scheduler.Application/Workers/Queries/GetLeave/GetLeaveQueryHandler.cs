using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Queries.GetLeave
{
    public class GetLeaveQueryHandler : IRequestHandler<GetLeaveQuery, LeaveVm>
    {
        private readonly IRepository<Leave> _repo;

        public GetLeaveQueryHandler(IRepository<Leave> repo)
        {
            _repo = repo;
        }

        public async Task<LeaveVm> Handle(GetLeaveQuery request, CancellationToken cancellationToken)
        {
            var leave = await _repo.GetById(request.Id);

            if (leave is null)
                throw new NotFoundException(nameof(Leave), request.Id);

            return new LeaveVm(leave);
        }
    }
}
