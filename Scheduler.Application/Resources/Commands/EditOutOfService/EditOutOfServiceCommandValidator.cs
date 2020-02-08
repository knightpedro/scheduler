using FluentValidation;

namespace Scheduler.Application.Resources.Commands.EditOutOfService
{
    public class EditOutOfServiceCommandValidator : AbstractValidator<EditOutOfServiceCommand>
    {
        public EditOutOfServiceCommandValidator()
        {
            RuleFor(o => o.Description).NotEmpty().MaximumLength(120);
            RuleFor(o => o.Reason).NotEmpty().MaximumLength(30);
        }
    }
}
