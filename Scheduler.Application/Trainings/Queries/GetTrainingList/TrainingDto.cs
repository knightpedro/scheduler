using Scheduler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Application.Trainings.Queries.GetTrainingList
{
    public class TrainingDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public IEnumerable<int> Workers { get; set; }

        public TrainingDto(Training t)
        {
            Id = t.Id;
            Description = t.Description;
            Location = t.Location;
            Start = t.TrainingPeriod.Start;
            End = t.TrainingPeriod.End;
            Workers = t.WorkerTraining.Select(wt => wt.WorkerId);
        }
    }
}
