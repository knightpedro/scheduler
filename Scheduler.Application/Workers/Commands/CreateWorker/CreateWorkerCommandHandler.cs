using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Commands.CreateWorker
{
    public class CreateWorkerCommandHandler : IRequestHandler<CreateWorkerCommand, int>
    {
        private readonly IRepository<Worker> _repo;

        public CreateWorkerCommandHandler(IRepository<Worker> repo)
        {
            _repo = repo;
        }

        public async Task<int> Handle(CreateWorkerCommand request, CancellationToken cancellationToken)
        {
            var worker = new Worker
            {
                Name = request.Name,
                IsActive = true
            };
            
            await _repo.Add(worker);
            return worker.Id;
        }
    }
}
