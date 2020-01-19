using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.ValueObjects;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Calendar.Queries.GetResourceCalendar
{
    public class GetResourceCalendarQueryHandler : IRequestHandler<GetResourceCalendarQuery, ResourceCalendarDto>
    {
        private readonly ICalendarRepository _repo;

        public GetResourceCalendarQueryHandler(ICalendarRepository repo)
        {
            _repo = repo;
        }

        public async Task<ResourceCalendarDto> Handle(GetResourceCalendarQuery request, CancellationToken cancellationToken)
        {
            if (request.Start is null || request.End is null)
            {
                return await _repo.GetResourceCalendar(request.Id);
            }
            var period = new DateTimeRange(request.Start.Value, request.End.Value);
            return await _repo.GetResourceCalendar(request.Id, period);
        }
    }
}
