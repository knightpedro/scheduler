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

            services.AddScoped(typeof(IRepository<>), typeof(SchedulerRepository<>));
            services.AddScoped<IConflictRepository>(provider => provider.GetService<ConflictRepository>());
            services.AddScoped<IJobRepository>(provider => provider.GetService<JobRepository>());
            services.AddScoped<IJobTaskRepository>(provider => provider.GetService<JobTaskRepository>());
            services.AddScoped<ITrainingRepository>(provider => provider.GetService<TrainingRepository>());

            return services;
        }
    }
}
