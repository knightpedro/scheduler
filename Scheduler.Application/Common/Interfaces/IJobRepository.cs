using Scheduler.Domain.Entities;
using System.Threading.Tasks;

namespace Scheduler.Application.Common.Interfaces
{
    public interface IJobRepository : IRepository<Job>
    {
        Task<Job> GetJobDetail(int Id);
    }
}
