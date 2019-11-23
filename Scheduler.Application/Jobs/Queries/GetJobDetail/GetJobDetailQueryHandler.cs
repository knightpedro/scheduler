using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Jobs.Queries.GetJobDetail
{
    public class GetJobDetailQueryHandler : IRequestHandler<GetJobDetailQuery, JobDetailVm>
    {
        private readonly IJobRepository _repo;

        public GetJobDetailQueryHandler(IJobRepository repo)
        {
            _repo = repo;
        }

        public async Task<JobDetailVm> Handle(GetJobDetailQuery request, CancellationToken cancellationToken)
        {
            var job = await _repo.GetJobDetail(request.Id);
            if (job is null)
                throw new NotFoundException(nameof(Job), request.Id);
            return new JobDetailVm(job);
        }
    }
}
