﻿using Scheduler.Domain.Entities;

namespace Scheduler.Application.Coordinators.Queries
{
    public class CoordinatorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }

        public CoordinatorDto(Coordinator c)
        {
            Id = c.Id;
            Name = c.Name;
            Email = c.Email;
            IsActive = c.IsActive;
        }
    }
}
