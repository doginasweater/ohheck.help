using System;
using Xunit;
using System.Net.Http;
using ohheck.help.Controllers;
using ohheck.help.Models.Data;
using System.Threading.Tasks;
using System.Net;

namespace ohheck.help.tests
{
    public class ApiTests : IClassFixture<Fixture<Startup>>
    {
        private readonly HttpClient _client;
        private readonly HttpClientHandler _handler;

        public ApiTests(Fixture<Startup> fixture)
        {
            _handler = new HttpClientHandler();
            _handler.ServerCertificateCustomValidationCallback += (a, b, c, d) => true;

            _client = new HttpClient(_handler);
            _client.BaseAddress = new Uri("https://localhost:43434");
            //_client = fixture.Client;
        }

        [Fact]
        public async Task ServerDoesNotThrow500()
        {
            // this does not work
            var resp = await _client.GetAsync("/");

            var respstr = await resp.Content.ReadAsStringAsync();

            Assert.True(resp.IsSuccessStatusCode);
        }

        [Fact]
        public async Task CardsReturn()
        {
            // this one does???
            var cards = await _client.GetAsync("/api/cards");

            Assert.True(cards.IsSuccessStatusCode);
        }
    }
}
