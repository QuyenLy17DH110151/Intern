using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerce.Application.Services.ProductCategory;
using eCommerce.Domain.Shared.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoriesController : ControllerBase
    {
        private readonly IProductCategoryService _productCategoryService;

        public ProductCategoriesController(IProductCategoryService productCategoryService)
        {
            _productCategoryService = productCategoryService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedResult<ProductCategoryReturnModels.ProductCategory>>> Search([FromQuery]ProductCategoryRequestModels.Search rq)
        {
            var productCategories = await _productCategoryService.SearchProductCategoriesAsync(rq);
            return productCategories;
        }
    }
}