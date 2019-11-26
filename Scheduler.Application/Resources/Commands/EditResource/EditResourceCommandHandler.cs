using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Resources.Commands.EditResource
{
    public class EditResourceCommandHandler : IRequestHandler<EditResourceCommand>
    {
        private readonly IRepository<Resource> _repo;

        public EditResourceCommandHandler(IRepository<Resource> repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(EditResourceCommand request, CancellationToken cancellationToken)
        {
            var resource = await _repo.GetById(request.Id);
            if (resource is null)
                throw new NotFoundException(nameof(Resource), request.Id);

            resource.Name = request.Name;
            resource.Description = request.Description;
            resource.IsActive = request.IsActive;

            await _repo.Update(resource);
            return Unit.Value;
        }
    }
}
