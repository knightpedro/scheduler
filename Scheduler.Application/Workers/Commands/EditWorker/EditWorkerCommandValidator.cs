using FluentValidation;

namespace Scheduler.Application.Workers.Commands.EditWorker
{
    public class EditWorkerCommandValidator : AbstractValidator<EditWorkerCommand>
    {
        public EditWorkerCommandValidator()
        {
            RuleFor(w => w.Name).NotEmpty().MaximumLength(50);
        }
    }
}
