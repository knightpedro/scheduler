using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Workers.Queries.GetLeave;
using Scheduler.Domain.Entities;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Queries.GetLeaveList
{
    public class GetLeaveListQueryHandler : IRequestHandler<GetLeaveListQuery, LeaveListVm>
    {
        private readonly IRepository<Leave> _repo;

        public GetLeaveListQueryHandler(IRepository<Leave> repo)
        {
            _repo = repo;
        }

        public async Task<LeaveListVm> Handle(GetLeaveListQuery request, CancellationToken cancellationToken)
        {
            var leave = await _repo.GetAll();
            return new LeaveListVm
            {
                Leave = leave.Select(l => new LeaveVm(l))
            };
        }
    }
}
