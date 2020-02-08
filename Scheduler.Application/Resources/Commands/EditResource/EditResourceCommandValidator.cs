using FluentValidation;

namespace Scheduler.Application.Resources.Commands.EditResource
{
    public class EditResourceCommandValidator : AbstractValidator<EditResourceCommand>
    {
        public EditResourceCommandValidator()
        {
            RuleFor(r => r.Name).NotEmpty().MaximumLength(30);
            RuleFor(r => r.Description).NotEmpty().MaximumLength(50);
        }
    }
}
