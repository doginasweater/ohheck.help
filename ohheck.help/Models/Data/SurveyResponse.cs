using System.Collections.Generic;

namespace ohheck.help.Models.Data
{
    public class SurveyResponse : Common
    {
        public string submitter { get; set; }
        public string comments { get; set; }
        public string nextgroup { get; set; }
        public virtual Survey survey { get; set; }
        public virtual ICollection<CardResponse> cardresponses { get; set; }
    }
}