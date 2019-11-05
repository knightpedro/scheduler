using AutoMapper;
using Scheduler.Application.Common.Mappings;
using Scheduler.Domain.Entities;

namespace Scheduler.Application.Workers.Queries.GetWorkerDetail
{
    public class WorkerDetailVm : IMap
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Worker, WorkerDetailVm>();
        }
    }
}
