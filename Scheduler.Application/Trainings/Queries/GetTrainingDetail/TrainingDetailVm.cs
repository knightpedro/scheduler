using Scheduler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Application.Trainings.Queries.GetTrainingDetail
{
    public class TrainingDetailVm
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public IEnumerable<WorkerTrainingDto> Workers { get; set; }

        public TrainingDetailVm(Training training)
        {
            Id = training.Id;
            Description = training.Description;
            Location = training.Location;
            Start = training.TrainingPeriod.Start;
            End = training.TrainingPeriod.End;
            Workers = training.WorkerTraining
                .Select(wt => new WorkerTrainingDto(wt));
        }
    }
}
