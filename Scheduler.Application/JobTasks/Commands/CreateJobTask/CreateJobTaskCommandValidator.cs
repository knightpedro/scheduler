using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.JobTasks.Commands.CreateJobTask
{
    public class CreateJobTaskCommandValidator : AbstractValidator<CreateJobTaskCommand>
    {
        public CreateJobTaskCommandValidator()
        {
            RuleFor(j => j.Description).NotEmpty().MaximumLength(160);
        }
    }
}
