using AutoMapper;
using eCommerce.Application.Shared;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.Products
{
    class ProductService : IProductService
    {
        private readonly IProductRepository _productRepo;
        private readonly IMapper _mapper;
        private readonly ApplicationContext _appContext;

        public ProductService(IProductRepository productRepo, IMapper mapper, ApplicationContext appContext)
        {
            _productRepo = productRepo;
            _mapper = mapper;
            _appContext = appContext;
        }

        public Task<ProductReturnModels.Product> GetAllProductAsync(Guid proId)
        {
            throw new NotImplementedException();
        }

        public Task<ProductReturnModels.Product> GetProductByCatIdAsync(Guid catId)
        {
            throw new NotImplementedException();
        }

        public async Task<PaginatedResult<ProductReturnModels.Product>> SearchProductsAsync(ProductRequestModels.Search req)
        {
            var products = await _productRepo.SearchAsync(new SearchProductModel
            {
                Keyword = req.SearchTerm,
                Pagination = new Pagination { PageIndex = req.PageIndex, ItemsPerPage = req.PageSize },
                ProductCategoryName = req.CategoryName,
                Owner = req.Owner,
                Role = _appContext.Principal.Role
            }) ;

            return _mapper.Map<PaginatedResult<ProductReturnModels.Product>>(products);
        }
    }
}
