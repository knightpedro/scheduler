using FluentValidation;

namespace Scheduler.Application.Trainings.Commands.EditTraining
{
    public class EditTrainingValidator : AbstractValidator<EditTrainingCommand>
    {
        public EditTrainingValidator()
        {
            RuleFor(t => t.Description).NotEmpty().MaximumLength(100);
            RuleFor(t => t.Location).NotEmpty().MaximumLength(50);
        }
    }
}
