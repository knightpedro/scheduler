using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Resources.Commands.DeleteOutOfService
{
    public class DeleteOutOfServiceCommandHandler : IRequestHandler<DeleteOutOfServiceCommand>
    {
        private readonly IRepository<ResourceOutOfService> _repo;

        public DeleteOutOfServiceCommandHandler(IRepository<ResourceOutOfService> repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(DeleteOutOfServiceCommand request, CancellationToken cancellationToken)
        {
            var oos = await _repo.GetById(request.Id);
            if (oos is null)
                throw new NotFoundException(nameof(ResourceOutOfService), request.Id);

            await _repo.Remove(oos);
            return Unit.Value;
        }
    }
}
