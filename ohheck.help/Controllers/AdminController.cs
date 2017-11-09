using System;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ohheck.help.Models;
using ohheck.help.Models.Data;
using ohheck.help.Models.ApiModels;
using Newtonsoft.Json;
using ohheck.help.Models.ViewModels;

namespace ohheck.help.Controllers {
    [Authorize]
    public class AdminController : Controller {
        private readonly ILogger _logger;
        private readonly HeckingContext _db;
        private readonly HttpClient client;

        public AdminController(ILoggerFactory factory, HeckingContext ctx, HttpClient _client) {
            _logger = factory.CreateLogger<AdminController>();
            _db = ctx;
            client = _client;
            _db.user = User?.Identity?.Name ?? "admin panel";
        }

        public async Task<Result> Sync() {
            var url = "api/cacheddata/";

            var response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode) {
                var content = await response.Content.ReadAsStringAsync();
                var obj = JsonConvert.DeserializeObject<CachedResponse>(content);

                var units = obj.cards_info.sub_units.Select(x => new Subunit {
                    name = x
                });

                foreach (var su in units) {
                    if (!_db.Subunits.Any(x => x.name == su.name)) {
                        _db.Subunits.Add(su);
                    }
                }

                var result = await _db.SaveChangesAsync();

                url = "api/cards/";

                do {
                    var resp = await client.GetStringAsync(url);
                    var respObj = JsonConvert.DeserializeObject<ApiResponse>(resp);

                    url = respObj.next;

                    foreach (var card in respObj.results) {
                        if (_db.Cards.Any(x => x.apiid == card.id)) {
                            continue;
                        }

                        var c = new Card {
                            apiid = card.id,
                            gameid = card.game_id,
                            rarity = (Rarity)Enum.Parse(typeof(Rarity), card.rarity),
                            attribute = (IdolAttribute)Enum.Parse(typeof(IdolAttribute), card.attribute),
                            imageurl = card.card_image,
                            ispromo = card.is_promo,
                            isidol = false
                        };

                        var c2 = new Card {
                            apiid = card.id,
                            gameid = card.game_id,
                            rarity = (Rarity)Enum.Parse(typeof(Rarity), card.rarity),
                            attribute = (IdolAttribute)Enum.Parse(typeof(IdolAttribute), card.attribute),
                            imageurl = card.card_idolized_image,
                            ispromo = card.is_promo,
                            isidol = true
                        };

                        var idol = _db.Idols.FirstOrDefault(x => x.name == card.idol.name);

                        if (idol == null) {
                            var g = _db.Groups.Include(x => x.subunits).FirstOrDefault(x => x.name == card.idol.main_unit);
                            var su = _db.Subunits.Include(x => x.idols).FirstOrDefault(x => x.name == card.idol.sub_unit);

                            if (g == null) {
                                g = new Group {
                                    name = card.idol.main_unit,
                                };

                                if (su != null) {
                                    g.subunits = new List<Subunit> {
                                        su
                                    };
                                }

                                _db.Groups.Add(g);
                                _db.SaveChanges();
                            } else if (su != null) {
                                if (g.subunits == null) {
                                    g.subunits = new List<Subunit>();
                                }

                                if (!g.subunits.Any(x => x.id == su.id)) {
                                    g.subunits.Add(su);
                                }
                            }

                            idol = new Idol {
                                name = card.idol.name,
                                subunit = su,
                                group = g
                            };
                        }

                        c.idol = idol;
                        c2.idol = idol;

                        _db.Cards.Add(c);
                        _db.Cards.Add(c2);

                        _db.SaveChanges();
                    }
                } while (url != null);

                return Result.Success();
            }

            return Result.Failure(response.ReasonPhrase);
        }

        public IActionResult Responses(int id) {
            var submissions = _db.Submissions
                .Include(x => x.answers)
                    .ThenInclude(x => x.question)
                .Include(x => x.answers)
                    .ThenInclude(x => x.answer)
                .Include(x => x.answers)
                    .ThenInclude(x => x.cardchoices)
                    .ThenInclude(x => x.card)
                .Include(x => x.answers)
                    .ThenInclude(x => x.choiceanswers)
                    .ThenInclude(x => x.answer)
                .Where(x => x.surveyid == id)
                .Where(x => x.answers.Any())
                .SelectMany(x => x.answers)
                .OrderBy(x => x.question.sortorder)
                .Select(x => new {
                    id = x.id,
                    question = x.question.sortorder,
                    type = x.question.type.ToString(),
                    answer = x.answer.text,
                    text = x.text,
                    cards = string.Join(", ", x.cardchoices.Select(y => y.card.gameid)),
                    selections = x.choiceanswers.Select(y => y.answer),
                    submissionid = x.submissionid,
                    submitted = x.created
                })
                .GroupBy(x => x.submissionid)
                .ToList()
                .Select(x => new {
                    submissionid = x.Key,
                    submitted = x.First().submitted.ToString("g"),
                    questions = x.OrderBy(y => y.question)
                })
                .ToList();

            return Json(submissions);
        }

        public IActionResult SurveysByCard(int id) {
            var responses = from cc in _db.CardChoices
                            join c in _db.Choices on cc.choiceid equals c.id
                            join s in _db.Submissions on c.submissionid equals s.id
                            where s.surveyid == id
                            select cc.card;

            var molded = responses
                .GroupBy(x => x.id)
                .Select(x => new {
                    count = x.Count(),
                    imageurl = x.FirstOrDefault().imageurl,
                    id = x.FirstOrDefault().id
                })
                .OrderByDescending(x => x.count);

            return Json(molded);
        }

        public List<SurveyViewModel> AllSurveys() =>
            _db.Surveys
                .Include(x => x.questions)
                .Select(x => x.Prettify())
                .ToList();

        public SurveyViewModel Survey(int id) =>
            _db.Surveys
                .Include(x => x.questions)
                .ThenInclude(x => x.answers)
                .ThenInclude(x => x.answercards)
                .ThenInclude(x => x.card)
                .SingleOrDefault(x => x.id == id)
                .Prettify();

        public async Task<List<Group>> Groups() =>
            await _db.Groups
                .Include(x => x.subunits)
                .Include(x => x.idols)
                .ThenInclude(x => x.cards)
                .Include(x => x.idols)
                .ThenInclude(x => x.subunit)
                .OrderBy(x => x.name)
                .ToListAsync();

        public async Task<List<Group>> GroupList() =>
            await _db.Groups
                .Where(x => !string.IsNullOrEmpty(x.name))
                .OrderBy(x => x.name)
                .ToListAsync();

        public async Task<Group> Group(int id) =>
            await _db.Groups
                .Include(x => x.subunits)
                .Include(x => x.idols)
                .ThenInclude(x => x.cards)
                .SingleOrDefaultAsync(x => x.id == id);

        public async Task<List<Idol>> Idols() =>
            await _db.Idols
                .Include(x => x.cards)
                .Include(x => x.group)
                .Include(x => x.subunit)
                .OrderBy(x => x.name)
                .ThenBy(x => x.group.name)
                .ThenBy(x => x.subunit.name)
                .ToListAsync();

        public async Task<List<Idol>> IdolList() =>
            await _db.Idols
                .OrderBy(x => x.name)
                .ToListAsync();

        public async Task<Idol> Idol(int id) =>
            await _db.Idols
                .Include(x => x.cards)
                .Include(x => x.group)
                .Include(x => x.subunit)
                .SingleOrDefaultAsync(x => x.id == id);

        public async Task<List<Subunit>> Subunits() =>
            await _db.Subunits
                .Include(x => x.idols)
                .ThenInclude(x => x.cards)
                .OrderBy(x => x.name)
                .ToListAsync();

        public async Task<List<Subunit>> SubunitList() =>
            await _db.Subunits
                .OrderBy(x => x.name)
                .ToListAsync();

        public async Task<Subunit> Subunit(int id) =>
            await _db.Subunits
                .Include(x => x.idols)
                .ThenInclude(x => x.cards)
                .SingleOrDefaultAsync(x => x.id == id);

        public async Task<List<Card>> Cards(int skip, int take) =>
            await _db.Cards
                .Where(x => !string.IsNullOrEmpty(x.imageurl))
                .OrderBy(x => x.gameid)
                .Skip(skip)
                .Take(take)
                .ToListAsync();

        public async Task<List<Card>> CardList(string filter, int id) {
            var query = _db.Cards
                .Where(x => x.ispromo == false);

            switch (filter) {
                case "group":
                    query = query
                        .Include(x => x.idol)
                        .ThenInclude(x => x.group)
                        .Where(x => x.idol.group.id == id);
                    break;
                case "idol":
                    query = query
                        .Include(x => x.idol)
                        .Where(x => x.idol.id == id);
                    break;
                case "subunit":
                    query = query
                        .Include(x => x.idol)
                        .ThenInclude(x => x.subunit)
                        .Where(x => x.idol.subunit.id == id);
                    break;
            }

            var results = await query
                .OrderBy(x => x.gameid)
                .ThenBy(x => x.isidol)
                .Select(x => new Card {
                    id = x.id,
                    gameid = x.gameid,
                    rarity = x.rarity,
                    attribute = x.attribute,
                    imageurl = x.imageurl,
                    isidol = x.isidol,
                    idol = new Idol {
                        name = x.idol.name
                    }
                })
                .ToListAsync();

            return results;
        }

        public async Task<Card> Card(int id) =>
            await _db.Cards.SingleOrDefaultAsync(x => x.id == id);

        public List<NotificationViewModel> Notifications() =>
            _db.Notifications
                .Include(x => x.action)
                .Where(x => x.foruser == User.Identity.Name || x.foruser == "***")
                .ToList()
                .Select(x => new NotificationViewModel(x))
                .ToList();

        public async Task<Result> AddNotification(NotificationViewModel n) {
            var note = new Notification {
                level = (Level)Enum.Parse(typeof(Level), n.level),
                text = n.text,
                action = n.action,
                foruser = string.IsNullOrEmpty(n.foruser) ? "***" : n.foruser,
                seen = false
            };

            try {
                await _db.Notifications.AddAsync(note);
                await _db.SaveChangesAsync();
            } catch (Exception ex) {
                return Result.Failure(ex.Message);
            }

            return Result.Success();
        }

        public IActionResult Error() => NotFound();

        public async Task<Result> SaveSurvey([FromBody] NewSurveyViewModel newSurvey) {
            var exists = _db.Surveys.Any(x => x.slug == newSurvey.slug);

            if (exists) {
                return Result.Failure("A survey with this slug already exists.");
            }

            var survey = new Survey {
                active = newSurvey.active,
                title = newSurvey.title,
                slug = newSurvey.slug,
                name = newSurvey.name,
                comments = newSurvey.comments,
                questions = newSurvey.questions.Select(x => new Question {
                    text = x.text,
                    sortorder = x.sortorder,
                    required = x.required,
                    type = (AnswerType)Enum.Parse(typeof(AnswerType), x.type),
                    answers = x.answers.Select(y => new Answer {
                        sortorder = y.sortorder,
                        text = y.text,
                        value = y.value,
                        answercards = y.cards == null ? new List<AnswerCard>() : y.cards.Select(z => new AnswerCard {
                            cardid = z.id
                        }).ToList()
                    }).ToList()
                }).ToList()
            };

            try {
                _db.Surveys.Add(survey);
                await _db.SaveChangesAsync();

                return Result.Success();
            } catch (Exception ex) {
                return Result.Failure(ex.Message);
            }
        }
    }
}
