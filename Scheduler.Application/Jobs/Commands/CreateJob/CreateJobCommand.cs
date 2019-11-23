using MediatR;
using System;

namespace Scheduler.Application.Jobs.Commands.CreateJob
{
    public class CreateJobCommand : IRequest<int>
    {
        public string JobNumber { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime? DateScheduled { get; set; }
        public DateTime? DateReceived { get; set; }
    }
}
