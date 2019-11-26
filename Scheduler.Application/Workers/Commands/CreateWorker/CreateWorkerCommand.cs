using MediatR;

namespace Scheduler.Application.Workers.Commands.CreateWorker
{
    public class CreateWorkerCommand : IRequest<int>
    {
        public string Name { get; set; }
    }
}
