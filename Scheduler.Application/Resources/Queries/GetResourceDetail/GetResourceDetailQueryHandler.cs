using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Resources.Queries.GetResourceDetail
{
    public class GetResourceDetailQueryHandler : IRequestHandler<GetResourceDetailQuery, ResourceDetailVm>
    {
        private readonly IRepository<Resource> _repo;

        public GetResourceDetailQueryHandler(IRepository<Resource> repo)
        {
            _repo = repo;
        }

        public async Task<ResourceDetailVm> Handle(GetResourceDetailQuery request, CancellationToken cancellationToken)
        {
            var resource = await _repo.GetById(request.Id);
            if (resource is null)
                throw new NotFoundException(nameof(Resource), request.Id);

            return new ResourceDetailVm(resource);
        }
    }
}
