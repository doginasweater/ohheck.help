using System.Collections.Generic;

namespace ohheck.help.Models.Data
{
    public class Submission : Common
    {
        public string submitter { get; set; }
        public int surveyid { get; set; }
        public virtual ICollection<Choice> answers { get; set; }
    }
}