using MediatR;

namespace Scheduler.Application.Trainings.Commands.DeleteTraining
{
    public class DeleteTrainingCommand : IRequest
    {
        public int TrainingId { get; set; }
    }
}
