using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ohheck.help.Models.Data
{
    public class Answer : Common
    {
        public Answer()
        {
            answercards = new HashSet<AnswerCard>();
            choiceanswers = new HashSet<ChoiceAnswer>();
        }

        public virtual Question question { get; set; }
        public int sortorder { get; set; }

        // Radio buttons, checkboxes, select boxes
        public string text { get; set; }
        public string value { get; set; }

        // Card type
        public virtual ICollection<AnswerCard> answercards { get; set; }

        // Associated choices
        public virtual ICollection<ChoiceAnswer> choiceanswers { get; set; }

        public AnswerViewModel Prettify() =>
            new AnswerViewModel
            {
                id = id,
                created = created.ToString("g"),
                modified = modified.ToString("g"),
                createdby = createdby,
                modifiedby = modifiedby,
                text = text,
                value = value,
                sortorder = sortorder,
                cards = answercards?.Select(x => x.card)?.Select(x => x.Prettify())
            };

        public AnswerViewModel Prettify(bool includeCommon) =>
            new AnswerViewModel
            {
                id = id,
                text = text,
                value = value,
                sortorder = sortorder,
                cards = answercards?
                    .Select(x => x.card)?
                    .Where(x => x.imageurl != null && x.imageurl != "")?
                    .Select(x => x.Prettify(false))
            };
    }

    public class AnswerViewModel : CommonViewModel
    {
        public int sortorder { get; set; }
        public string text { get; set; }
        public string value { get; set; }
        public IEnumerable<CardViewModel> cards { get; set; }
    }
}