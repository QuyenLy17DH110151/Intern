using AutoMapper;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared.Exceptions;
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
        
        async Task<Guid> IProductCategoryService.CreateProductCategoryAsync(ProductCategoryRequestModels.Create rq)
        {
            var productCategory = _mapper.Map<Domain.Entities.ProductCategory>(rq);

            _productCategoryRepo.Create(productCategory);
            await _productCategoryRepo.UnitOfWork.SaveChangesAsync();

            return productCategory.Id;
        }

        public async Task<Guid> UpdateProductCategoryAsync(ProductCategoryRequestModels.Update rq, Guid id)
        {
            var productCategory = await _productCategoryRepo.GetByIdAsync(id);
            if (productCategory == null)
                throw new EntityNotFound("Cannot find category");

            productCategory.Name = rq.Name;
            _productCategoryRepo.Update(productCategory);
            await _productCategoryRepo.UnitOfWork.SaveChangesAsync();

            return productCategory.Id;
        }

        public async Task<Guid> DeleteProductCategoryAsync(Guid id)
        {
            var productCategory = await _productCategoryRepo.GetByIdAsync(id);
            if (productCategory == null)
                throw new EntityNotFound("Cannot find category");

            _productCategoryRepo.Delete(productCategory);
            await _productCategoryRepo.UnitOfWork.SaveChangesAsync();

            return (productCategory.Id);
        }

        public async Task<ProductCategoryReturnModels.ProductCategory> GetProductCategoryByIdAsync(Guid id)
        {
            var productCategory = await _productCategoryRepo.GetByIdAsync(id);
            if (productCategory == null)
                throw new EntityNotFound("Cannot find category");

            return _mapper.Map<ProductCategoryReturnModels.ProductCategory>(productCategory);
        } 
        
    }
}
