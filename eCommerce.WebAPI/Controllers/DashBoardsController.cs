using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashBoardsController : ControllerBase
    {
        [HttpGet("SumEarnings")]
        public ActionResult GetSumEarnings()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            return Ok(1000);
        }
        [HttpGet("CountProduct")]
        public ActionResult GetCountProduct()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            return Ok(2000);
        }
        [HttpGet("CountComment")]
        public ActionResult GetCountComment()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            return Ok(3000);
        }
        [HttpGet("GetCountUser")]
        public ActionResult GetCountUser()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            return Ok(4000);
        }
    }
}
