using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Resources.Commands.CreateResource
{
    public class CreateResourceCommandHandler : IRequestHandler<CreateResourceCommand, int>
    {
        private readonly IRepository<Resource> _repo;

        public CreateResourceCommandHandler(IRepository<Resource> repo)
        {
            _repo = repo;
        }

        public async Task<int> Handle(CreateResourceCommand request, CancellationToken cancellationToken)
        {
            var resource = new Resource
            {
                Name = request.Name,
                Description = request.Description,
                IsActive = true
            };
            await _repo.Add(resource);
            return resource.Id;
        }
    }
}
