using MediatR;

namespace Scheduler.Application.Workers.Commands.DeleteWorker
{
    public class DeleteWorkerCommand : IRequest
    {
        public int Id { get; set; }
    }
}
