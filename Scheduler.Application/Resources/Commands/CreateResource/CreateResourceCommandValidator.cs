using FluentValidation;

namespace Scheduler.Application.Resources.Commands.CreateResource
{
    public class CreateResourceCommandValidator : AbstractValidator<CreateResourceCommand>
    {
        public CreateResourceCommandValidator()
        {
            RuleFor(r => r.Name).NotEmpty().MaximumLength(30);
            RuleFor(r => r.Description).NotEmpty().MaximumLength(50);
        }
    }
}
