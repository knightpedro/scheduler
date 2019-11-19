using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Persistence.Tests.TestData
{
    public static class SchedulerSeedData
    {
        public static List<Worker> GenerateWorkers(int count) => 
            Enumerable.Range(1, count).Select(i => new Worker { Name = $"Worker {i}" }).ToList();

        public static List<Worker> GenerateWorkersWithLeave(int count)
        {
            var workers = GenerateWorkers(count);
            var rand = new Random(1);
            foreach(var worker in workers)
            {
                var leaveCount = rand.Next(1, 5);
                for (int l = 0; l < leaveCount; l++)
                {
                    var leave = new Leave
                    {
                        LeavePeriod = new DateTimeRange(DateTime.Now.AddDays(-2), DateTime.Now)
                    };
                    worker.Leave.Add(leave);
                }
            }
            return workers;
        }
    }
}
