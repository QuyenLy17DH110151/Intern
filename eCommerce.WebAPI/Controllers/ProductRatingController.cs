using eCommerce.Application.Services.ProductRating;
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
    public class ProductRatingController : ControllerBase
    {

        private readonly IProdcutRatingService _prodcutRatingService;

        public ProductRatingController(IProdcutRatingService prodcutRatingService)
        {
            _prodcutRatingService = prodcutRatingService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedResult<ProductRatingReturnModels.ProductRating>>> Search([FromQuery] ProductRatingRequestModels.Search rq)
        {
            var rp = await _prodcutRatingService.SearchProductRatingAsync(rq);
            return rp;
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateProductRarting([FromBody] ProductRatingRequestModels.Create rq)
        {
            var id = await _prodcutRatingService.CreateProductRating(rq);
            return id;
        }

        [HttpGet("star/{idProduct}")]
        public async Task<ProductRatingReturnModels.GetStarResponse> GetStar(Guid idProduct)
        {
            var rp = await _prodcutRatingService.GetStar(idProduct);
            return rp;
        }



    }
}
