using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.ValueObjects;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Calendar.Queries.GetResourcesCalendar
{
    public class GetResourcesCalendarQueryHandler : IRequestHandler<GetResourcesCalendarQuery, ResourcesCalendarVm>
    {
        private readonly ICalendarRepository _repo;

        public GetResourcesCalendarQueryHandler(ICalendarRepository repo)
        {
            _repo = repo;
        }

        public async Task<ResourcesCalendarVm> Handle(GetResourcesCalendarQuery request, CancellationToken cancellationToken)
        {
            var period = new DateTimeRange(request.Start, request.End);
            var resources = await _repo.GetResourcesCalendar(period);
            return new ResourcesCalendarVm { Resources = resources };
        }
    }
}
