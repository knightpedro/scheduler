using MediatR;
using System;

namespace Scheduler.Application.Resources.Commands.CreateOutOfService
{
    public class CreateOutOfServiceCommand : IRequest<int>
    {
        public int ResourceId { get; set; }
        public string Description { get; set; }
        public string Reason { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
