using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ohheck.help.Models.ViewModels
{
    public class SurveySubmission
    {
        public int surveyid { get; set; }
        public Dictionary<int, bool> cards { get; set; }
        public Dictionary<int, string> choices { get; set; }
    }
}
