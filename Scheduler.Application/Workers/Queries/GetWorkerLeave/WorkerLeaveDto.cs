using AutoMapper;
using Scheduler.Application.Common.Mappings;
using Scheduler.Domain.Entities;
using System;

namespace Scheduler.Application.Workers.Queries.GetWorkerLeave
{
    public class WorkerLeaveDto : IMap
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string LeaveType { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Leave, WorkerLeaveDto>()
                .ForMember(d => d.Start, opt => opt.MapFrom(l => l.LeavePeriod.Start))
                .ForMember(d => d.End, opt => opt.MapFrom(l => l.LeavePeriod.End));
        }
    }
}
