using System;
using System.Collections.Generic;

namespace ohheck.help.Models.ViewModels {
    public class QuestionViewModel {
        public string text { get; set; }
        public string type { get; set; }
        public int sortorder { get; set; }
        public bool required { get; set; }
        public ICollection<AnswerViewModel> answers { get; set; }
    }
}