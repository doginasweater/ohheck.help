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
  public class AdminController : Controller {
    private readonly ILogger _logger;
    private readonly HeckingContext _db;
    static HttpClient client = new HttpClient();

    public AdminController(ILoggerFactory factory, HeckingContext ctx) {
      _logger = factory.CreateLogger<AdminController>();
      _db = ctx;
    }

    public async Task<IActionResult> SetupDb() {
      var url = "api/cacheddata/";
      client.BaseAddress = new Uri("http://schoolido.lu/");
      client.DefaultRequestHeaders.Accept.Clear();
      client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

      var response = await client.GetAsync(url);

      if (response.IsSuccessStatusCode) {
        var content = await response.Content.ReadAsStringAsync();
        var obj = JsonConvert.DeserializeObject<CachedResponse>(content);

        var units = obj.cards_info.sub_units.Select(x => new Subunit {
          name = x,
          created = DateTime.Now,
          createdby = "kevin",
          modified = DateTime.Now,
          modifiedby = "kevin"
        });

        foreach (var su in units) {
          _db.Subunits.Add(su);
        }

        var result = await _db.SaveChangesAsync();

        return Json(new { result });
      }
    
      return Json(new { response });
    }

    public async Task<IActionResult> Setup() {
      var url = "api/cards/?idol_sub_unit=CYaRon!";
      client.BaseAddress = new Uri("http://schoolido.lu/");
      client.DefaultRequestHeaders.Accept.Clear();
      client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

      do {
        var response = await client.GetAsync(url);

        if (response.IsSuccessStatusCode) {
          var content = await response.Content.ReadAsStringAsync();
          var respObj = JsonConvert.DeserializeObject<ApiResponse>(content);
          url = respObj.next;

          foreach (var card in respObj.results) {
            var c = new Card {
              apiid = card.id,
              gameid = card.game_id,
              rarity = (Rarity)Enum.Parse(typeof(Rarity), card.rarity),
              attribute = (ohheck.help.Models.Data.Attribute)Enum.Parse(typeof(ohheck.help.Models.Data.Attribute), card.attribute),
              imageurl = card.card_image,
              idolized_imageurl = card.card_idolized_image,
              ispromo = card.is_promo,
              created = DateTime.Now,
              createdby = "kevin",
              modified = DateTime.Now,
              modifiedby = "kevin"
            };

            var idol = _db.Idols.FirstOrDefault(x => x.name == card.idol.name);

            if (idol == null) {
              var g = _db.Groups.FirstOrDefault(x => x.name == card.idol.main_unit);

              if (g == null) {
                g = new Group {
                  name = card.idol.main_unit,
                  created = DateTime.Now,
                  createdby = "kevin",
                  modified = DateTime.Now,
                  modifiedby = "kevin"
                };
              }

              idol = new ohheck.help.Models.Data.Idol {
                name = card.idol.name,
                subunit = _db.Subunits.FirstOrDefault(x => x.name == card.idol.sub_unit),
                group = g,
                created = DateTime.Now,
                createdby = "kevin",
                modified = DateTime.Now,
                modifiedby = "kevin"
              };
            }

            c.idol = idol;

            _db.Cards.Add(c);
          }

          _db.SaveChanges();
        } else {
          _logger.LogInformation(response.ReasonPhrase);
          break;
        }
      } while (url != null);

      return Json(new { message = "success" });
    }
  }
}
