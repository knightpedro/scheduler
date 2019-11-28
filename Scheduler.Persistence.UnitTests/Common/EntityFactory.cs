using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Persistence.Tests.Common
{
    public static class EntityFactory
    {
        public static Job CreateJob()
        {
            return new Job
            {
                JobNumber = "J123",
                Description = "Test Job",
                Location = "1 Test St",
                IsComplete = false
            };
        }
        public static JobTask CreateJobTask()
        {
            return new JobTask
            {
                Description = "Test Job Task",
                TaskPeriod = new DateTimeRange(DateTime.Now, DateTime.Now.AddDays(1))
            };
        }

        public static Leave CreateLeave()
        {
            return new Leave 
            { 
                LeaveCategory = LeaveType.Annual, 
                LeavePeriod = new DateTimeRange(DateTime.Now, DateTime.Now.AddDays(2)) 
            };
        }

        public static List<Leave> CreateLeave(int n)
        {
            Random rnd = new Random(1);
            return Enumerable.Range(1, n).Select(i => new Leave
            {
                LeaveCategory = (LeaveType)rnd.Next((int)LeaveType.Alternate, (int)LeaveType.Sick),
                LeavePeriod = new DateTimeRange(
                    DateTime.Now.AddDays(rnd.Next(-100, 100)), 
                    new TimeSpan(rnd.Next(1, 15), 0, 0, 0))
            }).ToList();
        }

        public static Resource CreateResource()
        {
            return new Resource
            {
                Name = "Test Resource",
                Description = "A resource for testing",
                IsActive = true
            };
        }

        public static ResourceOutOfService CreateResourceOutOfService()
        {
            return new ResourceOutOfService
            {
                Description = "In for a warrant",
                Reason = ResourceOutOfServiceReason.Certification,
                Period = new DateTimeRange(DateTime.Now, DateTime.Now.AddHours(2))
            };
        }

        public static Training CreateTraining()
        {
            return new Training
            {
                Description = "Test Training",
                Location = "Training Room",
                TrainingPeriod = new DateTimeRange(DateTime.Now, DateTime.Now.AddHours(5))
            };
        }

        public static Worker CreateWorker()
        {
            return new Worker 
            { 
                Name = "Test Worker", 
                IsActive = true 
            };
        }

        public static List<Worker> CreateWorkers(int n)
        {
            return Enumerable.Range(1, n).Select(i => new Worker { Name = $"Worker {i}", IsActive = true }).ToList();
        }
    }
}
