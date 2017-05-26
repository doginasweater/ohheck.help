using System.Linq;
using System.Collections.Generic;

namespace ohheck.help.Models.Data
{
    public class Survey : Common
    {
        public string name { get; set; }
        public string title { get; set; }
        public bool active { get; set; }
        public string comments { get; set; }
        public string slug { get; set; }

        public ICollection<Question> questions { get; set; }
        public ICollection<Submission> responses { get; set; }

        public SurveyViewModel Prettify() =>
            new SurveyViewModel
            {
                id = id,
                created = created.ToString("g"),
                modified = modified.ToString("g"),
                createdby = createdby,
                modifiedby = modifiedby,
                name = name,
                title = title,
                active = active,
                comments = comments,
                slug = slug,
                questions = questions?.Select(x => x.Prettify())?.OrderBy(x => x.sortorder),
                submissions = responses
            };

        public SurveyViewModel Prettify(bool includeCommon) =>
            new SurveyViewModel
            {
                id = id,
                name = name,
                title = title,
                active = active,
                comments = comments,
                slug = slug,
                questions = questions?.Select(x => x.Prettify(false))?.OrderBy(x => x.sortorder),
                submissions = responses
            };
    }

    public class SurveyViewModel : CommonViewModel
    {
        public string name { get; set; }
        public string title { get; set; }
        public bool active { get; set; }
        public string comments { get; set; }
        public string slug { get; set; }
        public IEnumerable<QuestionViewModel> questions { get; set; }
        public ICollection<Submission> submissions { get; set; }
    }
}