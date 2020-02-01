using MediatR;
using System;

namespace Scheduler.Application.Workers.Commands.EditLeave
{
    public class EditLeaveCommand : IRequest
    {
        public int Id { get; set; }
        public int WorkerId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string LeaveType { get; set; }
    }
}
