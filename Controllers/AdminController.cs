using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Microsoft.Extensions.Logging;
using ohheck.help.Models.ApiModels;
using Newtonsoft.Json;
using ohheck.help.Models.Data;
using Microsoft.AspNetCore.Authorization;

namespace ohheck.help.Controllers
{
    public class AdminController : Controller
    {
        private readonly ILogger _logger;
        private readonly HeckingContext _db;
        private readonly HttpClient client;

        public AdminController(ILoggerFactory factory, HeckingContext ctx, HttpClient _client)
        {
            _logger = factory.CreateLogger<AdminController>();
            _db = ctx;
            client = _client;
        }

        public async Task<IActionResult> SetupDb()
        {
            var url = "api/cacheddata/";

            var response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var obj = JsonConvert.DeserializeObject<CachedResponse>(content);

                var units = obj.cards_info.sub_units.Select(x => new Subunit
                {
                    name = x,
                    created = DateTime.Now,
                    createdby = "kevin",
                    modified = DateTime.Now,
                    modifiedby = "kevin"
                });

                foreach (var su in units)
                {
                    _db.Subunits.Add(su);
                }

                _db.Surveys.Add(new Survey
                {
                    id = 1,
                    name = "first survey",
                    slug = "cyaron",
                    created = DateTime.Now,
                    modified = DateTime.Now,
                    modifiedby = "kevin",
                    createdby = "kevin"
                });

                var result = await _db.SaveChangesAsync();

                return Json(new { result });
            }

            return Json(new { response });
        }

        public async Task<IActionResult> Setup()
        {
            var url = "api/cards/?idol_sub_unit=CYaRon!";

            do
            {
                var response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var respObj = JsonConvert.DeserializeObject<ApiResponse>(content);
                    url = respObj.next;

                    foreach (var card in respObj.results)
                    {
                        var c = new Card
                        {
                            apiid = card.id,
                            gameid = card.game_id,
                            rarity = (Rarity)Enum.Parse(typeof(Rarity), card.rarity),
                            attribute = (IdolAttribute)Enum.Parse(typeof(IdolAttribute), card.attribute),
                            imageurl = card.card_image,
                            ispromo = card.is_promo,
                            isidol = false,
                            created = DateTime.Now,
                            createdby = "kevin",
                            modified = DateTime.Now,
                            modifiedby = "kevin",
                        };

                        var c2 = new Card
                        {
                            apiid = card.id,
                            gameid = card.game_id,
                            rarity = (Rarity)Enum.Parse(typeof(Rarity), card.rarity),
                            attribute = (IdolAttribute)Enum.Parse(typeof(IdolAttribute), card.attribute),
                            imageurl = card.card_idolized_image,
                            ispromo = card.is_promo,
                            isidol = true,
                            created = DateTime.Now,
                            createdby = "kevin",
                            modified = DateTime.Now,
                            modifiedby = "kevin"
                        };

                        var idol = _db.Idols.FirstOrDefault(x => x.name == card.idol.name);

                        if (idol == null)
                        {
                            var g = _db.Groups.FirstOrDefault(x => x.name == card.idol.main_unit);

                            if (g == null)
                            {
                                g = new Group
                                {
                                    name = card.idol.main_unit,
                                    created = DateTime.Now,
                                    createdby = "kevin",
                                    modified = DateTime.Now,
                                    modifiedby = "kevin"
                                };
                            }

                            idol = new Models.Data.Idol
                            {
                                name = card.idol.name,
                                subunit = _db.Subunits.FirstOrDefault(x => x.name == card.idol.sub_unit),
                                group = g,
                                created = DateTime.Now,
                                createdby = "kevin",
                                modified = DateTime.Now,
                                modifiedby = "kevin"
                            };
                        }

                        c.idol = idol;
                        c2.idol = idol;

                        _db.Cards.Add(c);
                        _db.Cards.Add(c2);
                    }

                    _db.SaveChanges();
                }
                else
                {
                    _logger.LogInformation(response.ReasonPhrase);
                    break;
                }
            } while (url != null);

            return Json(new { message = "success" });
        }

        public IActionResult Responses()
        {
            var responses = _db.Responses
                .Where(x => x.survey.id == 1)
                .Select(x => new
                {
                    submitter = x.submitter,
                    comments = x.comments,
                    cards = string.Join(", ", x.cardresponses.Select(y => y.card.gameid)),
                    submitted = x.created.ToShortDateString()
                });

            return Json(responses);
        }

        public IActionResult SurveysByCard()
        {
            var responses = from cr in _db.CardResponses
                            join r in _db.Responses on cr.responseid equals r.id
                            where r.survey.id == 1
                            select cr.card;

            var molded = responses
                .GroupBy(x => x.id)
                .Select(x => new
                {
                    count = x.Count(),
                    imageurl = x.FirstOrDefault().imageurl,
                    attribute = x.FirstOrDefault().attribute.ToString(),
                    rarity = x.FirstOrDefault().rarity.ToString(),
                    id = x.FirstOrDefault().id
                })
                .OrderByDescending(x => x.count);

            return Json(molded);
        }

    }
}
