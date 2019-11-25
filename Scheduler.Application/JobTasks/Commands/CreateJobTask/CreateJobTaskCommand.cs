using MediatR;
using System;

namespace Scheduler.Application.JobTasks.Commands.CreateJobTask
{
    public class CreateJobTaskCommand : IRequest<int>
    {
        public int JobId { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
