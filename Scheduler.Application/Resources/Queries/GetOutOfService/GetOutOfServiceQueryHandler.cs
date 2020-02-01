using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Resources.Queries.GetOutOfService
{
    public class GetOutOfServiceQueryHandler : IRequestHandler<GetOutOfServiceQuery, OutOfServiceVm>
    {
        private readonly IRepository<ResourceOutOfService> _repo;

        public GetOutOfServiceQueryHandler(IRepository<ResourceOutOfService> repo)
        {
            _repo = repo;
        }
        
        public async Task<OutOfServiceVm> Handle(GetOutOfServiceQuery request, CancellationToken cancellationToken)
        {
            var outOfService = await _repo.GetById(request.Id);

            if (outOfService is null)
                throw new NotFoundException(nameof(ResourceOutOfService), request.Id);

            return new OutOfServiceVm(outOfService);
        }
    }
}
