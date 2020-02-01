using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Resources.Commands.CreateOutOfService
{
    public class CreateOutOfServiceCommandHandler : IRequestHandler<CreateOutOfServiceCommand, int>
    {
        private readonly IRepository<ResourceOutOfService> _repo;

        public CreateOutOfServiceCommandHandler(IRepository<ResourceOutOfService> repo)
        {
            _repo = repo;
        }

        public async Task<int> Handle(CreateOutOfServiceCommand request, CancellationToken cancellationToken)
        {
            ResourceOutOfServiceReason reason;
            Enum.TryParse(request.Reason, true, out reason);

            var oos = new ResourceOutOfService
            {
                ResourceId = request.ResourceId,
                Description = request.Description,
                Reason = reason,
                Period = new DateTimeRange(request.Start, request.End)
            };

            await _repo.Add(oos);
            return oos.Id;
        }
    }
}
