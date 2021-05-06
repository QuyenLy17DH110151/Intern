using AutoMapper;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.ProductRating
{
    public class ProductRatingService : IProdcutRatingService
    {

        private readonly IMapper _mapper;

        private readonly IProductRatingRepository _productRatingRepository;

        public ProductRatingService(IMapper mapper, IProductRatingRepository productRatingRepository)
        {
            _mapper = mapper;
            _productRatingRepository = productRatingRepository;
        }

        public async Task<Guid> CreateProductRating(ProductRatingRequestModels.Create rq)
        {
            var productRating = _mapper.Map<Domain.Entities.ProductRating>(rq);

            _productRatingRepository.Add(productRating);

            await _productRatingRepository.UnitOfWork.SaveChangesAsync();

            return productRating.Id;
        }

        public async Task<PaginatedResult<ProductRatingReturnModels.ProductRating>> SearchProductRatingAsync(ProductRatingRequestModels.Search rq)
        {

            var productRatings = await _productRatingRepository.SearchAsync(
                new SearchProductRating
                {
                    Pagination = new Pagination { PageIndex = rq.PageIndex, ItemsPerPage = rq.PageSize }
                });

            return _mapper.Map<PaginatedResult<ProductRatingReturnModels.ProductRating>>(productRatings);
        }
    }
}
