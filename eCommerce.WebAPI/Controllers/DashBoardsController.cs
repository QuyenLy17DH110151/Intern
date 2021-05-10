using eCommerce.Application.Services.DashBoard;
using eCommerce.Application.Services.Order;
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
        private readonly IDashBoardService _dashBoardService;
        private readonly IOrderService _orderService;
        public DashBoardsController(IDashBoardService dashBoardService, IOrderService orderService)
        {
            _dashBoardService = dashBoardService;
            _orderService = orderService;
        }

        [HttpGet("SumEarnings")]
        public async Task<ActionResult> GetSumEarningsAsync()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var sumEarning = await _dashBoardService.GetSumEarningsAsync();
            return Ok(sumEarning);
        }

        [HttpGet("CountProduct")]
        public async Task<ActionResult> GetCountProductAsync()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var countProduct = await _dashBoardService.GetCountProductAsync();
            return Ok(countProduct);
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
        public async Task<ActionResult> GetCountUserAsync()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var countUsers = await _dashBoardService.GetCountUserAsync();
            return Ok(countUsers);
        }
    }
}
