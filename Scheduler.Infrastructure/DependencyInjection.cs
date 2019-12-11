using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Infrastructure.Identity;

namespace Scheduler.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUserManager, UserManagerService>();

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("SchedulerDatabase")));

            services.AddDefaultIdentity<ApplicationUser>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

            services.AddAuthentication()
                .AddIdentityServerJwt();

            // TODO: add route for generating JWT

            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //  .AddJwtBearer(cfg =>
            //  {
            //      cfg.TokenValidationParameters = new TokenValidationParameters()
            //      {
            //          ValidateIssuer = true,
            //          ValidIssuer = _config["Security:Tokens:Issuer"],
            //          ValidateAudience = true,
            //          ValidAudience = _config["Security:Tokens:Audience"],
            //          ValidateIssuerSigningKey = true,
            //          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Security:Tokens:Key"])),

            //      };
            //  });

            return services;
        }
    }
}
