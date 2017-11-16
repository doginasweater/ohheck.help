using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ohheck.help.Models;
using ohheck.help.Models.Data;
using ohheck.help.Models.ViewModels;

namespace ohheck.help.Controllers {
    public class ApiController : Controller {
        private readonly HeckingContext _db;

        public ApiController(HeckingContext ctx) {
            _db = ctx;
            _db.user = User?.Identity?.Name ?? "web";
        }

        public SurveyViewModel Survey(string id) =>
            _db.Surveys
                .Include(x => x.questions)
                .ThenInclude(x => x.answers)
                .ThenInclude(x => x.answercards)
                .ThenInclude(x => x.card)
                .SingleOrDefault(x => x.slug == id.ToLower())
                .Prettify(false);

        [HttpPost]
        public async Task<Result> Submit([FromBody] SurveySubmission response) {
            var survey = await _db.Surveys
                .Include(x => x.questions)
                .ThenInclude(x => x.answers)
                .ThenInclude(x => x.answercards)
                .ThenInclude(x => x.card)
                .SingleOrDefaultAsync(x => x.id == response.surveyid);

            var choices = survey.questions
                .Select(x => {
                    var c = new Choice {
                        question = x,
                        type = x.type
                    };

                    var q_and_a = response.choices.SingleOrDefault(y => y.Key == x.id);

                    switch (x.type) {
                        case AnswerType.MultiLineText:
                        case AnswerType.SingleLineText:
                            c.text = q_and_a.Value.choice;
                            break;
                        case AnswerType.SelectBox:
                        case AnswerType.RadioButtons:
                            int.TryParse(q_and_a.Value.choice, out int result);

                            c.answer = _db.Answers.SingleOrDefault(y => y.id == result);

                            break;
                        case AnswerType.Checkbox:
                            c.choiceanswers = q_and_a.Value.selections
                                .Where(y => y.Value)
                                .Select(y => new ChoiceAnswer {
                                    answerid = int.Parse(y.Key)
                                }).ToList();
                            break;
                        default:
                            break;
                    }

                    return c;
                })
                .ToList();

            var submission = new Submission {
                surveyid = survey.id,
                answers = choices
            };

            _db.Submissions.Add(submission);

            await _db.SaveChangesAsync();

            if (response.cards != null && response.cards.Any()) {
                var choiceid = submission.answers.SingleOrDefault(x => x.type == AnswerType.Cards);

                var cards = response.cards
                    .Where(x => x.Value == true)
                    .Select(x => new CardChoice {
                        cardid = x.Key,
                        choiceid = choiceid.id
                    })
                    .ToList();

                choiceid.cardchoices = cards;

                await _db.SaveChangesAsync();
            }

            return Result.Success();
        }
    }
}