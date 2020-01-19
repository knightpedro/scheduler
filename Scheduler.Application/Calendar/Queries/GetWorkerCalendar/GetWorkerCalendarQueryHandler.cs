using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Calendar.Queries.GetWorkerCalendar
{
    public class GetWorkerCalendarQueryHandler : IRequestHandler<GetWorkerCalendarQuery, WorkerCalendarDto>
    {
        private readonly ICalendarRepository _repo;

        public GetWorkerCalendarQueryHandler(ICalendarRepository repo)
        {
            _repo = repo;
        }

        public async Task<WorkerCalendarDto> Handle(GetWorkerCalendarQuery request, CancellationToken cancellationToken)
        {
            if (request.Start is null || request.End is null)
            {
                return await _repo.GetWorkerCalendar(request.Id);
            }
            var period = new DateTimeRange(request.Start.Value, request.End.Value);
            return await _repo.GetWorkerCalendar(request.Id, period);
        }
    }
}
