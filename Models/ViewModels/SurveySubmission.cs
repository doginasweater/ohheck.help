using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ohheck.help.Models.ViewModels
{
    public class SurveySubmission
    {
        public int surveyid { get; set; }
        public Dictionary<int, bool> chosen { get; set; }
        public string comments { get; set; }
        public string submitter { get; set; }
    }
}
