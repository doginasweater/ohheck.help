using System;
using System.Collections.Generic;

namespace ohheck.help.Models.ViewModels {
    public class NewSurveyViewModel {
        public string name { get; set; }
        public string title { get; set; }
        public bool active { get; set; }
        public string comments { get; set; }
        public string slug { get; set; }
        public ICollection<QuestionViewModel> questions { get; set; }
    }
}