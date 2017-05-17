using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ohheck.help.Models;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.Extensions.Logging;
using ohheck.help.Models.ApiModels;
using Newtonsoft.Json;
using ohheck.help.Models.Data;

namespace ohheck.help.Controllers {
  public class ApiController : Controller {
    private readonly HeckingContext _db; 

    public ApiController(HeckingContext ctx) {
      _db = ctx;
    }

    public IActionResult Subunits() => Json(_db.Subunits.ToList());
    
    public IActionResult Cards() => Json(_db.Cards.Select(x => new {
        imageurl = x.imageurl,
        idolized_imageurl = x.idolized_imageurl,
        attribute = x.attribute.ToString(),
        rarity = x.rarity.ToString(),
        id = x.id
      })
      .ToList());
  }
}