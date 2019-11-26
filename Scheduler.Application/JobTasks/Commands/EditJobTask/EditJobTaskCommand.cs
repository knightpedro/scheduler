using MediatR;
using System;

namespace Scheduler.Application.JobTasks.Commands.EditJobTask
{
    public class EditJobTaskCommand : IRequest
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
