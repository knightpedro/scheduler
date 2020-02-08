using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Resources.Queries.GetOutOfService;
using Scheduler.Domain.Entities;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Resources.Queries.GetOutOfServicesList
{
    public class GetOutOfServicesListQueryHandler : IRequestHandler<GetOutOfServicesListQuery, OutOfServicesListVm>
    {
        private readonly IRepository<ResourceOutOfService> _repo;

        public GetOutOfServicesListQueryHandler(IRepository<ResourceOutOfService> repo)
        {
            _repo = repo;
        }

        public async Task<OutOfServicesListVm> Handle(GetOutOfServicesListQuery request, CancellationToken cancellationToken)
        {
            var oos = await _repo.GetAll();
            return new OutOfServicesListVm
            {
                OutOfServices = oos.Select(o => new OutOfServiceVm(o))
            };
        }
    }
}
