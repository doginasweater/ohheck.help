using System.Collections.Generic;

namespace ohheck.help.Models.Data
{
    public class Subunit : Common
    {
        public string name { get; set; }

        public virtual ICollection<Idol> idols { get; set; }
    }
}