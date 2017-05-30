using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ohheck.help.Models.Data
{
    public class Choice : Common
    {
        public int submissionid { get; set; }
        public virtual Question question { get; set; }
        public AnswerType type { get; set; }

        //text responses
        public string text { get; set; }

        //card responses
        public virtual ICollection<CardChoice> cardchoices { get; set; }

        //checkboxes, radio buttons
        public virtual ICollection<ChoiceAnswer> choiceanswers { get; set; } 

        //select box
        public virtual Answer answer { get; set; }
    }
}
