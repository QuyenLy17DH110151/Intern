using AutoMapper;
using eCommerce.Domain.Entities;
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

        public ProductService(IProductRepository productRepo, IMapper mapper)
        {
            _productRepo = productRepo;
            _mapper = mapper;
        }

        public async Task<PaginatedResult<ProductReturnModels.Product>> SearchProductsAsync(ProductRequestModels.Search req)
        {
            var products = await _productRepo.SearchAsync(new SearchProductModel
            {
                Keyword = req.SearchTerm,
                Pagination = new Pagination { PageIndex = req.PageIndex, ItemsPerPage = req.PageSize },
            });

            return _mapper.Map<PaginatedResult<ProductReturnModels.Product>>(products);  //mapper khi get data from DB
        }

        public async Task<Guid> CreateAsync(ProductRequestModels.Create request)
        {
            var product = new Product()
            {
                Name = request.Name,
                Price = request.Price,
                CategoryId = request.CategoryId,
                OwnerId = request.OwnerId
            };

            _productRepo.Add(product);
            await _productRepo.UnitOfWork.SaveChangesAsync();
            return product.Id;
        }

        public async Task<ProductReturnModels.Product> GetProductByIdAsync(Guid Id)
        {
            var product = await _productRepo.GetProductByIdAsync(Id);

            if (product == null)
            {
                return null; // return message: not found user???
            }

            return _mapper.Map<ProductReturnModels.Product>(product);
        }

    }
}
