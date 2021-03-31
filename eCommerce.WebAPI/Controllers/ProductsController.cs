﻿using eCommerce.Application.Services.Products;
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

        [HttpGet("search")] //[GET] api/Product/search
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

            req.Photos = req.PhotoString.Split(',').ToList();
            var productId = await _productService.CreateAsync(req);

            if(productId == null)
            {
                return BadRequest();
            }

            var product =  await _productService.GetProductByIdAsync(productId);
            //return CreatedAtAction("GetProductByIdAsync", new { id = productId }, product);
            return Ok(new { product = product });
        }

        [HttpPost("upload-photo")] //[POST] api/Product/upload-photo
        public async Task<ActionResult<ProductReturnModels.Product>> UploadOne([FromBody] ProductRequestModels.UploadPhoto req)
        {
            var productId = await _productService.UploadPhotoAsync(req);

            return await _productService.GetProductByIdAsync(productId);
        }

        [HttpGet("{productId}")] //[POST] api/Product/:productId;
        public async Task<ActionResult<ProductReturnModels.Product>> GetProductDetail(Guid productId)
        {
            return await _productService.GetProductByIdAsync(productId);
        }

    }
}
