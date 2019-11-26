using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Resources.Queries.GetResourceOutOfServices
{
    public class GetResourceOutOfServicesQueryHandler : IRequestHandler<GetResourceOutOfServicesQuery, ResourceOutOfServicesListVm>
    {
        private readonly IRepository<Resource> _repo;

        public GetResourceOutOfServicesQueryHandler(IRepository<Resource> repo)
        {
            _repo = repo;
        }

        public async Task<ResourceOutOfServicesListVm> Handle(GetResourceOutOfServicesQuery request, CancellationToken cancellationToken)
        {
            var resource = await _repo.FirstOrDefault(r => r.Id == request.ResourceId, r => r.OutOfServices);
            if (resource is null)
                throw new NotFoundException(nameof(Resource), request.ResourceId);

            return new ResourceOutOfServicesListVm(resource);
        }
    }
}
