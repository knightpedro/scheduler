using FluentValidation;

namespace Scheduler.Application.Trainings.Commands.EditTraining
{
    public class EditTrainingValidator : AbstractValidator<EditTrainingCommand>
    {
        public EditTrainingValidator()
        {
            RuleFor(t => t.Description).NotEmpty().MaximumLength(30);
            RuleFor(t => t.Location).NotEmpty().MaximumLength(30);
        }
    }
}
