using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ohheck.help.Models.Data;
using ohheck.help.Models.ViewModels;
using System.Threading.Tasks;
using System;

namespace ohheck.help.Controllers
{
    public class ApiController : Controller
    {
        private readonly HeckingContext _db;

        public ApiController(HeckingContext ctx)
        {
            _db = ctx;
        }

        public IActionResult Subunits() => Json(_db.Subunits.ToList());

        public IActionResult Cards() => Json(_db.Cards
            .Where(x => x.imageurl != null && x.imageurl != "")
            .OrderBy(x => x.gameid)
            .ThenBy(x => x.isidol)
            .ToList()
            .Select(x => new
            {
                imageurl = x.imageurl,
                attribute = x.attribute.ToString(),
                rarity = x.rarity.ToString(),
                id = x.id
            })
            .ToList());

        public async Task<IActionResult> Submit([FromBody] SurveySubmission response)
        {
            var submission = new SurveyResponse
            {
                comments = response.comments,
                submitter = response.submitter,
                survey = _db.Surveys.SingleOrDefault(x => x.id == response.surveyid),
                nextgroup = response.nextgroup,
                created = DateTime.Now,
                createdby = string.IsNullOrEmpty(response.submitter) ? "anonymous" : response.submitter,
                modified = DateTime.Now,
                modifiedby = string.IsNullOrEmpty(response.submitter) ? "anonymous" : response.submitter
            };

            _db.Responses.Add(submission);

            await _db.SaveChangesAsync();

            submission.cardresponses = response.chosen
                .Where(x => x.Value == true)
                .Select(x => new CardResponse
                {
                    cardid = x.Key,
                    responseid = submission.id
                })
                .ToList();

            await _db.SaveChangesAsync();

            return Json(new { success = true });
        }
    }
}