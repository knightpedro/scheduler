using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.ValueObjects;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Queries.GetWorkersCalendar
{
    public class GetWorkersCalendarQueryHandler : IRequestHandler<GetWorkersCalendarQuery, WorkersCalendarVm>
    {
        private readonly ICalendarRepository _repo;

        public GetWorkersCalendarQueryHandler(ICalendarRepository repo)
        {
            _repo = repo;
        }

        public async Task<WorkersCalendarVm> Handle(GetWorkersCalendarQuery request, CancellationToken cancellationToken)
        {
            var period = new DateTimeRange(request.Start, request.End);
            var calendar =  await _repo.GetWorkersCalendar(period);
            return new WorkersCalendarVm { Workers = calendar };
        }
    }
}
