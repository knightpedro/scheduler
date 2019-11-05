using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Workers.Queries.GetWorkerDetail
{
    public class GetWorkerDetailQuery : IRequest<WorkerDetailVm>
    {
        public int Id { get; set; }
    }
}
