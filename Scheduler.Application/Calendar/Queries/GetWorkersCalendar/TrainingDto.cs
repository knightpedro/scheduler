using Scheduler.Domain.Entities;
using System;

namespace Scheduler.Application.Calendar.Queries.GetWorkersCalendar
{
    public class TrainingDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public TrainingDto(Training training)
        {
            Id = training.Id;
            Description = training.Description;
            Start = training.TrainingPeriod.Start;
            End = training.TrainingPeriod.End;
        }
    }
}
