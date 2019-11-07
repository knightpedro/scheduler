using AutoMapper;
using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Workers.Commands.CreateWorker
{
    public class CreateWorkerCommandHandler : IRequestHandler<CreateWorkerCommand, int>
    {
        private readonly ISchedulerDbContext _context;

        public CreateWorkerCommandHandler(ISchedulerDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateWorkerCommand request, CancellationToken cancellationToken)
        {
            var worker = new Worker
            {
                Name = request.Name,
                IsActive = request.IsActive
            };

            _context.Workers.Add(worker);
            await _context.SaveChangesAsync(cancellationToken);
            return worker.Id;
        }
    }
}
