using AutoMapper;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared.Exceptions;
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

        private readonly IProductRepository _productRepository;

        public ProductRatingService(IMapper mapper, IProductRatingRepository productRatingRepository, IProductRepository productRepository)
        {
            _mapper = mapper;
            _productRatingRepository = productRatingRepository;
            _productRepository = productRepository;
        }

        public async Task<Guid> CreateProductRating(ProductRatingRequestModels.Create rq)
        {
            var productRating = _mapper.Map<Domain.Entities.ProductRating>(rq);

            productRating.CreatedDate = DateTime.UtcNow;

            var product = await _productRepository.GetProductByIdAsync(rq.ProductId);

            if (product == null)
            {
                throw new EntityNotFound("Product");
            };

            productRating.Product = product;

            _productRatingRepository.Add(productRating);

            await _productRatingRepository.UnitOfWork.SaveChangesAsync();

            return productRating.Id;
        }

        public async Task<ProductRatingReturnModels.GetStarResponse> GetStar(Guid idProduct)
        {
            var productRatings = await _productRatingRepository.SearchAsync(
                new SearchProductRating
                {
                    ProductId = idProduct,
                    Pagination = new Pagination { PageIndex = 0, ItemsPerPage = 1000 },
                });
            ProductRatingReturnModels.GetStarResponse getStarResponse = new ProductRatingReturnModels.GetStarResponse
            {
                StarOne = 0,
                StarTwo = 0,
                StarThree = 0,
                StarFour = 0,
                StarFive = 0,
            };


            foreach (var productRating in productRatings.Items)
            {
                getStarResponse.AddStart(productRating.NumberStar);
            }

            return getStarResponse;

        }

        public async Task<PaginatedResult<ProductRatingReturnModels.ProductRating>> SearchProductRatingAsync(ProductRatingRequestModels.Search rq)
        {

            var productRatings = await _productRatingRepository.SearchAsync(
                new SearchProductRating
                {
                    ProductId = rq.ProductId,
                    Pagination = new Pagination { PageIndex = rq.PageIndex, ItemsPerPage = rq.PageSize },
                    Sort = new List<SortItem> { new SortItem { FieldName = "CreatedDate", IsDescending = true } }
                });

            return _mapper.Map<PaginatedResult<ProductRatingReturnModels.ProductRating>>(productRatings);
        }
    }
}
