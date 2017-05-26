using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ohheck.help.Models.Data
{
    public class Question : Common
    {
        public Question()
        {
            answers = new HashSet<Answer>();
        }

        public string text { get; set; }
        public AnswerType type { get; set; }
        public int sortorder { get; set; }
        public bool required { get; set; }

        public virtual Survey survey { get; set; }
        public virtual ICollection<Answer> answers { get; set; }

        public QuestionViewModel Prettify() =>
            new QuestionViewModel
            {
                text = text,
                type = type.ToString(),
                sortorder = sortorder,
                required = required ? "Yes" : "No",
                answers = answers?.Select(x => x.Prettify())?.OrderBy(x => x.sortorder),
                id = id,
                created = created.ToString("g"),
                modified = modified.ToString("g"),
                createdby = createdby,
                modifiedby = modifiedby
            };

        public QuestionViewModel Prettify(bool includeCommon) =>
            new QuestionViewModel
            {
                id = id,
                text = text,
                type = type.ToString(),
                sortorder = sortorder,
                required = required ? "Yes" : "No",
                answers = answers?.Select(x => x.Prettify(false))?.OrderBy(x => x.sortorder),
            };
    }

    public enum AnswerType
    {
        Cards,
        MultiLineText,
        SingleLineText,
        SelectBox,
        RadioButtons,
        Checkbox
    }

    public class QuestionViewModel : CommonViewModel
    {
        public string text { get; set; }
        public string type { get; set; }
        public int sortorder { get; set; }
        public string required { get; set; }

        public virtual IEnumerable<AnswerViewModel> answers { get; set; }
    }
}
