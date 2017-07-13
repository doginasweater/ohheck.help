using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ohheck.help.Models.Data
{
    public class NotificationAction : Common
    {
        public string text { get; set; }
        public string type { get; set; }
        public string location { get; set; }
    }
}
