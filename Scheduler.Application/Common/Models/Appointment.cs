using Scheduler.Domain.Entities;
using System;

namespace Scheduler.Application.Common.Models
{
    public enum AppointmentTypes {
        JobTask,
        Leave,
        OutOfService,
        Training
    }

    public class Appointment
    {
        public int Id { get; set; }
        public string  Type { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsConflicting { get; set; }

        public Appointment(JobTask task)
        {
            Id = task.Id;
            Type = AppointmentTypes.JobTask.ToString();
            Description = task.Description;
            Start = task.TaskPeriod.Start;
            End = task.TaskPeriod.End;
        }

        public Appointment(Leave leave)
        {
            Id = leave.Id;
            Type = AppointmentTypes.Leave.ToString();
            Description = leave.LeaveCategory.ToString() + " Leave";
            Start = leave.LeavePeriod.Start;
            End = leave.LeavePeriod.End;
        }

        public Appointment(ResourceOutOfService oos)
        {
            Id = oos.Id;
            Type = AppointmentTypes.OutOfService.ToString();
            Description = oos.Reason.ToString();
            Start = oos.Period.Start;
            End = oos.Period.End;
        }

        public Appointment(Training training)
        {
            Id = training.Id;
            Type = AppointmentTypes.Training.ToString();
            Description = training.Description;
            Start = training.TrainingPeriod.Start;
            End = training.TrainingPeriod.End;
        }

    }
}
