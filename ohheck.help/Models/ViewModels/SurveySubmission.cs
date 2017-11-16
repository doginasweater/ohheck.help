using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ohheck.help.Models.ViewModels {
    public class SurveySubmission {
        public int surveyid { get; set; }
        public Dictionary<int, bool> cards { get; set; }
        public Dictionary<int, ChoiceViewModel> choices { get; set; }

        public SurveySubmission() {
            cards = new Dictionary<int, bool>();
            choices = new Dictionary<int, ChoiceViewModel>();
        }
    }

    public class ChoiceViewModel {
        public string choice { get; set; }
        public Dictionary<string, bool> selections { get; set; }

        public ChoiceViewModel() => selections = new Dictionary<string, bool>();
    }
}
