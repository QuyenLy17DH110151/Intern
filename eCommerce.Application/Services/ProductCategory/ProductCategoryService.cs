using AutoMapper;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.ProductCategory
{
    public class ProductCategoryService : IProductCategoryService
    {
        private readonly IProductcategoryRepository _productCategoryRepo;
        private readonly IMapper _mapper;

        public ProductCategoryService(IProductcategoryRepository productCategoryRepo, IMapper mapper)
        {
            _productCategoryRepo = productCategoryRepo;
            _mapper = mapper;
        }

        public async Task<PaginatedResult<ProductCategoryReturnModels.ProductCategory>> SearchProductCategoriesAsync(ProductCategoryRequestModels.Search rq)
        {
            var productcategories = await _productCategoryRepo.SearchAsync(new SearchProductCategoryModel
            {
                Keyword = rq.SearchTerm,
                Pagination = new Pagination { PageIndex = rq.PageIndex, ItemsPerPage = rq.PageSize },
            });

            return _mapper.Map<PaginatedResult<ProductCategoryReturnModels.ProductCategory>>(productcategories);
        }
    }
}
