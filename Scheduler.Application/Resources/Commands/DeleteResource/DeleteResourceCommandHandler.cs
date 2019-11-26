using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Resources.Commands.DeleteResource
{
    public class DeleteResourceCommandHandler : IRequestHandler<DeleteResourceCommand>
    {
        private readonly IRepository<Resource> _repo;

        public DeleteResourceCommandHandler(IRepository<Resource> repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(DeleteResourceCommand request, CancellationToken cancellationToken)
        {
            var resource = await _repo.GetById(request.Id);
            if (resource is null)
                throw new NotFoundException(nameof(Resource), request.Id);
            await _repo.Remove(resource);
            return Unit.Value;
        }
    }
}
