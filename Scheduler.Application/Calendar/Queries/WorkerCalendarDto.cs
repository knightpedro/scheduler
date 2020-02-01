﻿using System.Collections.Generic;

namespace Scheduler.Application.Calendar.Queries
{
    public class WorkerCalendarDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public IEnumerable<JobTaskDto> JobTasks { get; set; }
        public IEnumerable<LeaveDto> Leave { get; set; }
        public IEnumerable<TrainingDto> Training { get; set; }
    }
}
