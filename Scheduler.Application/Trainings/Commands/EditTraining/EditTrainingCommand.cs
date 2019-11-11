using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Trainings.Commands.EditTraining
{
    public class EditTrainingCommand : IRequest
    {
        public int TrainingId { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
