using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Resources.Commands.EditOutOfService
{
    public class EditOutOfServiceCommandHandler : IRequestHandler<EditOutOfServiceCommand>
    {
        private readonly IRepository<ResourceOutOfService> _repo;

        public EditOutOfServiceCommandHandler(IRepository<ResourceOutOfService> repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(EditOutOfServiceCommand request, CancellationToken cancellationToken)
        {
            var outOfService = await _repo.GetById(request.Id);
            if (outOfService is null )
                throw new NotFoundException(nameof(ResourceOutOfService), request.Id);

            ResourceOutOfServiceReason reason;
            Enum.TryParse(request.Reason, true, out reason);

            outOfService.Description = request.Description;
            outOfService.ResourceId = request.ResourceId;
            outOfService.Period = new DateTimeRange(request.Start, request.End);
            outOfService.Reason = reason;

            await _repo.Update(outOfService);
            return Unit.Value;
        }
    }
}
