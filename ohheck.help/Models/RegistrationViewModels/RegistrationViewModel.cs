using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ohheck.help.Models.RegistrationViewModels
{
    public class RegistrationViewModel
    {
        public int track { get; set; }
        public int comprehensive { get; set; }
        public int manuscriptcritiques { get; set; }
        public int portfoliocritiques { get; set; }
        public string coupon { get; set; }
        public double subtotal { get; set; }
        public double total { get; set; }
        public string nonce { get; set; }
        public UserViewModel user { get; set; }
    }

    public class UserViewModel
    { 
        public string address1 { get; set; }
        public string address2 { get; set; }
        public string city { get; set; }
        public string country { get; set; }
        public string email { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string phone { get; set; }
        public string province { get; set; }
        public string postal { get; set; }
        public bool member { get; set; }
    }
}
