using FluentValidation;

namespace Scheduler.Application.Resources.Commands.CreateOutOfService
{
    public class CreateOutOfServiceCommandValidator : AbstractValidator<CreateOutOfServiceCommand>
    {
        public CreateOutOfServiceCommandValidator()
        {
            RuleFor(o => o.Description).NotEmpty().MaximumLength(120);
            RuleFor(o => o.Reason).NotEmpty().MaximumLength(30);
        }
    }
}
