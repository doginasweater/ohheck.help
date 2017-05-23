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

        public ApiTests(Fixture<Startup> fixture)
        {
            _client = fixture.Client;

            ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, errors) => true;
        }

        [Fact]
        public async Task ServerDoesNotThrow500()
        {
            try
            {
                var resp = await _client.GetAsync("/");

                if (!resp.IsSuccessStatusCode)
                {
                    System.Diagnostics.Debug.WriteLine($"Failure: {resp.StatusCode} {resp.ReasonPhrase} {resp.RequestMessage}");
                }

                Assert.True(resp.IsSuccessStatusCode);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Something went wrong: {ex.Message}");

                throw;
            }
        }

        [Fact]
        public async Task CardsReturn()
        {
            var cards = await _client.GetAsync("/api/cards");

            Assert.True(cards.IsSuccessStatusCode);
        }
    }
}
