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
    public class ProductRatingService : IProductRatingService
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

        public async Task<Guid> CreateProductRatingAsync(ProductRatingRequestModels.Create rq)
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

        public async Task<ProductRatingReturnModels.GetStarResponse> GetStarAsync(Guid idProduct)
        {
            var productRatings = await _productRatingRepository.SearchAsync(
                new SearchProductRating
                {
                    ProductId = idProduct,
                    Pagination = new Pagination { PageIndex = 0, ItemsPerPage = 1000 },
                });

            if (productRatings == null)
            {
                throw new EntityNotFound("productRating");
            }

            var product = await _productRepository.GetProductByIdAsync(idProduct);

            if (product == null)
            {
                throw new EntityNotFound("product");
            }

            //init GetStarResponse 
            ProductRatingReturnModels.GetStarResponse getStarResponse = new ProductRatingReturnModels.GetStarResponse
            {
                StartValues = new List<ProductRatingReturnModels.StartValue>()
                {
                    new ProductRatingReturnModels.StartValue{NumberStar = 1, Value =0},
                    new ProductRatingReturnModels.StartValue{NumberStar = 2, Value =0},
                    new ProductRatingReturnModels.StartValue{NumberStar = 3, Value =0},
                    new ProductRatingReturnModels.StartValue{NumberStar = 4, Value =0},
                    new ProductRatingReturnModels.StartValue{NumberStar = 5, Value =0}
                },
                MaxStart = 5,
                NumberStart = 0,
                ProductId = product.Id,
                ProductName = product.Name,
                SumValue = 0,
                AvgValue = 0
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
