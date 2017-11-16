using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ohheck.help.Models.ViewModels {
    public class SurveySubmission {
        public int surveyid { get; set; }
        public Dictionary<int, bool> cards { get; set; }
        public Dictionary<int, ChoiceViewModel> choices { get; set; }
    }

    public class ChoiceViewModel {
        public string choice { get; set; }
        public Dictionary<string, bool> selections { get; set; }
    }
}
