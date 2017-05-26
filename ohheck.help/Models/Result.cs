using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ohheck.help.Models
{
    public struct Result
    {
        public bool success { get; set; }
        public string message { get; set; }

        public static Result Success() => new Result
        {
            success = true
        };

        public static Result Failure(string message) => new Result
        {
            success = false,
            message = message
        };
    }
}
