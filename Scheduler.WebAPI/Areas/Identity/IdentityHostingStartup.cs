using Microsoft.AspNetCore.Hosting;

[assembly: HostingStartup(typeof(Scheduler.WebUI.Areas.Identity.IdentityHostingStartup))]
namespace Scheduler.WebUI.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => { });
        }
    }
}