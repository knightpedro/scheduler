using Scheduler.Domain.Entities;
using System.Threading.Tasks;

namespace Scheduler.Application.Common.Interfaces
{
    public interface IJobTaskRepository : IRepository<JobTask>
    {
        Task<JobTask> GetByIdWithShifts(int id);
    }
}
