using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Xunit;

namespace ohheck.help.tests.integration {
    public class Integration : IClassFixture<TestFixture<ohheck.help.Startup>> {
        private readonly HttpClient _client;

        public Integration(TestFixture<ohheck.help.Startup> fixture) {
            _client = fixture.Client;
        }

        [Fact]
        public async Task DoesNotThrow() {
            var stuff = await _client.GetStringAsync("/");

            Assert.True(!string.IsNullOrEmpty(stuff));
        }
    }
}
