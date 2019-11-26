using MediatR;

namespace Scheduler.Application.JobTasks.Commands.DeleteJobTask
{
    public class DeleteJobTaskCommand : IRequest
    {
        public int Id { get; set; }
    }
}
