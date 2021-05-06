using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.ProductRating
{
    public interface IProdcutRatingService
    {
        Task<PaginatedResult<ProductRatingReturnModels.ProductRating>> SearchProductRatingAsync(ProductRatingRequestModels.Search rq);
        Task<Guid> CreateProductRating(ProductRatingRequestModels.Create rq);
    }
}
