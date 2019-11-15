﻿using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Trainings.Commands.EditTraining
{
    public class EditTrainingCommandHandler : IRequestHandler<EditTrainingCommand>
    {
        private readonly ISchedulerDbContext _context;

        public EditTrainingCommandHandler(ISchedulerDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(EditTrainingCommand request, CancellationToken cancellationToken)
        {
            var training = await _context.Training.FindAsync(request.TrainingId);
            if (training is null)
                throw new NotFoundException(nameof(Training), request.TrainingId);

            
            training.Description = request.Description;
            training.Location = request.Location;
            training.TrainingPeriod = new DateTimeRange(request.Start, request.End);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}