using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Workers.Commands.DeleteWorker
{
    public class DeleteWorkerCommand : IRequest
    {
        public int Id { get; set; }
    }
}
