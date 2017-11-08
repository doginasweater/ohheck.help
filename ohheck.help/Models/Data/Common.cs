using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ohheck.help.Models.Data
{
    public abstract class Common
    {
        [Key]
        public int id { get; set; }

        public DateTime created { get; set; }
        public string createdby { get; set; }

        public DateTime modified { get; set; }
        public string modifiedby { get; set; }
    }

    public abstract class CommonViewModel
    {
        public int id { get; set; }
        public string created { get; set; }
        public string createdby { get; set; }
        public string modified { get; set; }
        public string modifiedby { get; set; }
    }
}