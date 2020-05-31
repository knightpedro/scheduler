using FluentValidation;

namespace Scheduler.Application.Jobs.Commands.CreateJob
{
    public class CreateJobCommandValidator : AbstractValidator<CreateJobCommand>
    {
        public CreateJobCommandValidator()
        {
            RuleFor(j => j.JobNumber).NotEmpty().MaximumLength(10);
            RuleFor(j => j.Description).NotEmpty().MaximumLength(160);
            RuleFor(j => j.Location).NotEmpty().MaximumLength(50);
        }
    }
}
