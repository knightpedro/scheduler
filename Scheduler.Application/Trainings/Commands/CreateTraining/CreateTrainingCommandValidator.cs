using FluentValidation;

namespace Scheduler.Application.Trainings.Commands.CreateTraining
{
    public class CreateTrainingCommandValidator : AbstractValidator<CreateTrainingCommand>
    {
        public CreateTrainingCommandValidator()
        {
            RuleFor(t => t.Description).MaximumLength(100);
            RuleFor(t => t.Location).MaximumLength(50);
        }
    }
}
