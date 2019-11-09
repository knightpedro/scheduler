using MediatR;
using System;

namespace Scheduler.Application.Workers.Commands.CreateLeave
{
    public class CreateLeaveCommand : IRequest<int>
    {
        public int WorkerId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string LeaveType { get; set; }
    }
}
