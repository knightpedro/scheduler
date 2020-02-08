using FluentValidation;

namespace Scheduler.Application.Jobs.Commands.EditJob
{
    public class EditJobCommandValidator : AbstractValidator<EditJobCommand>
    {
        public EditJobCommandValidator()
        {
            RuleFor(j => j.JobNumber).NotEmpty().MaximumLength(10);
            RuleFor(j => j.Description).NotEmpty().MaximumLength(160);
            RuleFor(j => j.Location).NotEmpty().MaximumLength(30);
        }
    }
}
