﻿using AutoMapper;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared.Models;
using System;
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
        
        async Task<Guid> IProductCategoryService.CreateProductCategory(ProductCategoryRequestModels.Create rq)
        {
            var productCategory = new Domain.Entities.ProductCategory
            {
                Name = rq.Name
            };

            _productCategoryRepo.Create(productCategory);
            await _productCategoryRepo.UnitOfWork.SaveChangesAsync();

            return productCategory.Id;
        }

        public async Task<Guid> UpdateProductCategory(ProductCategoryRequestModels.Update rq, Guid id)
        {
            var productCategory = await _productCategoryRepo.GetByIdAsync(id);
            if (productCategory == null)
                throw new Exception("Cannot find category");

            productCategory.Name = rq.Name;
            _productCategoryRepo.Update(productCategory);
            await _productCategoryRepo.UnitOfWork.SaveChangesAsync();

            return productCategory.Id;
        }

        public async Task<Guid> DeleteProductCategory(Guid id)
        {
            var productCategory = await _productCategoryRepo.GetByIdAsync(id);
            if (productCategory == null)
                throw new Exception("Cannot find category");

            _productCategoryRepo.Delete(productCategory);
            await _productCategoryRepo.UnitOfWork.SaveChangesAsync();

            return (productCategory.Id);
        }

        public async Task<ProductCategoryReturnModels.ProductCategory> GetProductCategoryById(Guid id)
        {
            var productCategory = await _productCategoryRepo.GetByIdAsync(id);
            if (productCategory == null)
                throw new Exception("Cannot find category");

            return _mapper.Map<ProductCategoryReturnModels.ProductCategory>(productCategory);
        } 

        public async Task<PaginatedResult<ProductCategoryReturnModels.ProductCategory>> ListProductCategoriesAsync(ProductCategoryRequestModels.Search rq)
        {
            var productcategories = await _productCategoryRepo.ListAsync(new ListProductCategory
            {
                Keyword = rq.SearchTerm,
                Pagination = new Pagination { PageIndex = rq.PageIndex, ItemsPerPage = rq.PageSize },
            });

            return _mapper.Map<PaginatedResult<ProductCategoryReturnModels.ProductCategory>>(productcategories);
        }
    }
}
