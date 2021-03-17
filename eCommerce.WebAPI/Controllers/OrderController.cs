using eCommerce.Application.Services.Order;
using eCommerce.Domain.Shared.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedResult<OrderReturnModel.Order>>> Search([FromQuery] OrderRequestModels.Search rq)
        {
            var orders = await _orderService.SearchOrdersAsync(rq);
            return orders;
        }
    }
}
