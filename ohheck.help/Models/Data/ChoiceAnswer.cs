using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ohheck.help.Models.Data
{
    public class ChoiceAnswer
    {
        public int choiceid { get; set; }
        public virtual Choice choice { get; set; }

        public int answerid { get; set; }
        public virtual Answer answer { get; set; }
    }
}
