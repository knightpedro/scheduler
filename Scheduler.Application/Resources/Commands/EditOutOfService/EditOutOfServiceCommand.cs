using MediatR;
using System;

namespace Scheduler.Application.Resources.Commands.EditOutOfService
{
    public class EditOutOfServiceCommand : IRequest
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int ResourceId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Reason { get; set; }
    }
}
