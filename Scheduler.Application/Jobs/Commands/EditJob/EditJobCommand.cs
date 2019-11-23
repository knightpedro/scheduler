using MediatR;
using System;

namespace Scheduler.Application.Jobs.Commands.EditJob
{
    public class EditJobCommand : IRequest
    {
        public int Id { get; set; }
        public string JobNumber { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime? DateReceived { get; set; }
        public DateTime? DateScheduled { get; set; }
        public bool IsComplete { get; set; }
    }
}
