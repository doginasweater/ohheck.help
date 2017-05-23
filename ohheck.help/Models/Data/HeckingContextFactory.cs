using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ohheck.help.Models.Data
{
    public class HeckingContextFactory : IDbContextFactory<HeckingContext> 
    {
        public HeckingContext Create(string[] args) =>
            Program.BuildWebHost(args).Services.GetRequiredService<HeckingContext>();
    }
}
