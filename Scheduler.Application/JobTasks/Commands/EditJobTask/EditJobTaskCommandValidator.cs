using FluentValidation;

namespace Scheduler.Application.JobTasks.Commands.EditJobTask
{
    public class EditJobTaskCommandValidator : AbstractValidator<EditJobTaskCommand>
    {
        public EditJobTaskCommandValidator()
        {
            RuleFor(j => j.Description).NotEmpty().MaximumLength(160);
        }
    }
}
