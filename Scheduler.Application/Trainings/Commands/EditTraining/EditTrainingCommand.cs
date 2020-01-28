using MediatR;
using System;

namespace Scheduler.Application.Trainings.Commands.EditTraining
{
    public class EditTrainingCommand : IRequest
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
