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

        [HttpGet("get")]
        public async Task<ActionResult<PaginatedResult<ProductCategoryReturnModels.ProductCategory>>> Search([FromQuery]ProductCategoryRequestModels.Search rq)
        {
            var productCategories = await _productCategoryService.SearchProductCategoriesAsync(rq);
            return productCategories;
        }

        [HttpGet("getAllList")]
        public async Task<ActionResult<PaginatedResult<ProductCategoryReturnModels.ProductCategory>>> GetAllList([FromQuery]ProductCategoryRequestModels.Search rq)
        {
            var productCategories = await _productCategoryService.ListProductCategoriesAsync(rq);
            return productCategories;
        }

        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody]ProductCategoryRequestModels.Create rq)
        {
            var productCategory = await _productCategoryService.CreateProductCategory(rq);
            if (productCategory == null)
                return BadRequest();

            var category = await _productCategoryService.GetProductCategoryById(productCategory);            
            return Ok( new { category= category});
        }

        [HttpPut("update")]
        public async Task<ActionResult> Update([FromBody]ProductCategoryRequestModels.Update rq, Guid id)
        {
            var productCategory = await _productCategoryService.UpdateProductCategory(rq, id); 
            if (productCategory == null)
                return BadRequest();

            var category = await _productCategoryService.GetProductCategoryById(productCategory);
            return Ok(category);
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var productCategory = await _productCategoryService.DeleteProductCategory(id);
            return Ok();
        }

    }
}