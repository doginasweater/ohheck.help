using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace ohheck.api.Controllers
{
    [Route("identity")]
    [Authorize]
    public class IdentityController : Controller
    {
        public IActionResult Get()
        {
            return Json(from c in User.Claims select new { c.Type, c.Value });
        }
    }
}