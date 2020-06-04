using Scheduler.Application.Common.Models;
using Scheduler.Domain.Entities;

namespace Scheduler.Application.Conflicts
{
    public class ConflictingEventDto
    {
        public int Id { get; set; }
        public string Type { get; set; }

        public ConflictingEventDto(int id, string type)
        {
            Id = id;
            Type = type;
        }

        public ConflictingEventDto(JobTask jobTask)
        {
            Id = jobTask.Id;
            Type = AppointmentTypes.JobTask.ToString();
        }
        public ConflictingEventDto(Leave leave)
        {
            Id = leave.Id;
            Type = AppointmentTypes.Leave.ToString();
        }
        public ConflictingEventDto(ResourceOutOfService outOfService)
        {
            Id = outOfService.Id;
            Type = AppointmentTypes.OutOfService.ToString();
        }
        public ConflictingEventDto(Training training)
        {
            Id = training.Id;
            Type = AppointmentTypes.Training.ToString();
        }
    }
}
