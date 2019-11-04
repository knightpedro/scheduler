using AutoMapper;
using Scheduler.Application.Common.Mappings;
using Xunit;

namespace Scheduler.Application.Tests.Mappings
{
    public class MappingConfigurationTests
    {
        [Fact]
        public void MappingCofiguration_IsValid()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<MappingProfile>());
            config.AssertConfigurationIsValid();
        }
    }
}
