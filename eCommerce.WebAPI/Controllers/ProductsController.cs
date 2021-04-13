using eCommerce.Application.Services.Products;
using eCommerce.Domain.Shared.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet] //[GET] api/Product
        public async Task<ActionResult<PaginatedResult<ProductReturnModels.Product>>> Search([FromQuery] ProductRequestModels.Search req)
        {
            var product = await _productService.SearchProductsAsync(req);
            return product;
        }

        [HttpPost] //[POST] api/Products
        public async Task<ActionResult<ProductReturnModels.Product>> Create([FromBody] ProductRequestModels.Create req)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productId = await _productService.CreateAsync(req);
            var product =  await _productService.GetProductByIdAsync(productId);

            return product;
        }
        
        [HttpGet("{productId}")] //[POST] api/Products/:productId;
        public async Task<ActionResult<ProductReturnModels.Product>> GetProductDetail(Guid productId)
        {
            var product = await _productService.GetProductByIdAsync(productId);
            
            if(product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpGet("category/{categoryId}")] //[POST] api/Products/:categoryId;
        public async Task<ActionResult<List<ProductReturnModels.Product>>> GetProductByCategory(Guid categoryId)
        {
            var products = await _productService.GetProductByCategoryIdAsync(categoryId);

            if (products == null)
            {
                return NotFound();
            }

            return products;
        }

    }
}
