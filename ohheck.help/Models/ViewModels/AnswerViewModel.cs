using System;
using System.Collections.Generic;
using ohheck.help.Models.Data;

namespace ohheck.help.Models.ViewModels {
    public class AnswerViewModel {
        public string text { get; set; }
        public string value { get; set; }
        public int sortorder { get; set; }
        public ICollection<Card> cards { get; set; }
    }
}