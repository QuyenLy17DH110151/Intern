using eCommerce.Application.Services.Products;
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
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService userService)
        {
            _productService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedResult<ProductReturnModels.Product>>> Search([FromQuery] ProductRequestModels.Search req)
        {
            var product = await _productService.SearchProductsAsync(req);
            return product;
        }

        [HttpPost]
        public async Task<ActionResult<ProductReturnModels.Product>> Create([FromBody] ProductRequestModels.Create req)
        {
            //if ()

            //    return NotFound();

            var productId = await _productService.CreateAsync(req);

            return await _productService.GetProductByIdAsync(productId);
        }
    }
}
