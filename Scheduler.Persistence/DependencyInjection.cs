using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Persistence.Repositories;

namespace Scheduler.Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<SchedulerDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("SchedulerDatabase")));

            services.AddScoped<ISchedulerDbContext>(provider => provider.GetService<SchedulerDbContext>());

            services.AddScoped(typeof(IRepositoryAsync<>), typeof(SchedulerRepository<>));

            return services;
        }
    }
}
