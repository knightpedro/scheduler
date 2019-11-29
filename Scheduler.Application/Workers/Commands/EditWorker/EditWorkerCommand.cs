using MediatR;

namespace Scheduler.Application.Workers.Commands.EditWorker
{
    public class EditWorkerCommand : IRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
    }
}
