using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Workers.Commands.CreateWorker
{
    public class CreateWorkerCommandValidator : AbstractValidator<CreateWorkerCommand>
    {
        public CreateWorkerCommandValidator()
        {
            RuleFor(w => w.Name).NotEmpty().MaximumLength(50);
        }
    }
}
