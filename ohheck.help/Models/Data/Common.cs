using System;

namespace ohheck.help.Models.Data
{
    public class Common
    {
        public int id { get; set; }
        public DateTime created { get; set; }
        public string createdby { get; set; }
        public DateTime modified { get; set; }
        public string modifiedby { get; set; }
    }

    public class CommonViewModel
    {
        public int id { get; set; }
        public string created { get; set; }
        public string createdby { get; set; }
        public string modified { get; set; }
        public string modifiedby { get; set; }
    }
}