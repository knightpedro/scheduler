using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Resources.Queries.GetResourcesList
{
    public class GetResourcesListQueryHandler : IRequestHandler<GetResourcesListQuery, ResourcesListVm>
    {
        private readonly IRepository<Resource> _repo;

        public GetResourcesListQueryHandler(IRepository<Resource> repo)
        {
            _repo = repo;
        }

        public async Task<ResourcesListVm> Handle(GetResourcesListQuery request, CancellationToken cancellationToken)
        {
            var resources = await _repo.GetAll(request.PageNumber, request.PageSize);
            return new ResourcesListVm(resources);
        }
    }
}
