﻿using AutoMapper;
using Scheduler.Application.Common.Mappings;
using System;

namespace Scheduler.Application.Training.Queries.GetTrainingList
{
    public class TrainingDto : IMap
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.Training, TrainingDto>()
                .ForMember(d => d.Start, opt => opt.MapFrom(t => t.TrainingPeriod.Start))
                .ForMember(d => d.End, opt => opt.MapFrom(t => t.TrainingPeriod.End));
        }
    }
}
