using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerce.Application.Services.ProductCategory;
using eCommerce.Domain.Shared.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.WebAPI.Controllers
{
    //[Authorize]
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

        [HttpPost]
        public async Task<ActionResult> Create([FromBody]ProductCategoryRequestModels.Create rq)
        {
            var productCategory = await _productCategoryService.CreateProductCategoryAsync(rq);
            if (productCategory == null)
                return BadRequest();

            var category = await _productCategoryService.GetProductCategoryByIdAsync(productCategory);            
            return Ok( new { category= category});
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody]ProductCategoryRequestModels.Update rq, Guid id)
        {
            var productCategory = await _productCategoryService.UpdateProductCategoryAsync(rq, id); 
            if (productCategory == null)
                return BadRequest();

            var category = await _productCategoryService.GetProductCategoryByIdAsync(productCategory);
            return Ok(category);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(Guid id)
        {
            var productCategory = await _productCategoryService.DeleteProductCategoryAsync(id);
            return Ok();
        }

    }
}