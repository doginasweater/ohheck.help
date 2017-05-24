using System;
using System.Collections.Generic;

namespace ohheck.help.Models.RegistrationViewModels {
    public class Prices {
        public Dictionary<string, decimal> workshop { get; set; }
        public Dictionary<string, decimal> comprehensive { get; set; }
        public Dictionary<string, decimal> critique { get; set; }
    }
}