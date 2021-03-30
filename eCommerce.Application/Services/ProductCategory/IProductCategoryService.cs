using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.ProductCategory
{
    public interface IProductCategoryService
    {
        /// <summary>
        /// Searchs product category
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<PaginatedResult<ProductCategoryReturnModels.ProductCategory>> SearchProductCategoriesAsync(ProductCategoryRequestModels.Search rq);

        /// <summary>
        /// Create product category
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<Guid> CreateProductCategory(ProductCategoryRequestModels.Create rq);

        /// <summary>
        /// Update product category
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<Guid> UpdateProductCategory(ProductCategoryRequestModels.Update rq, Guid id);

        /// <summary>
        /// Delete product category
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<Guid> DeleteProductCategory(Guid id);

        /// <summary>
        /// Get product category Id
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<ProductCategoryReturnModels.ProductCategory> GetProductCategoryById(Guid id);

        /// <summary>
        /// List product category
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<PaginatedResult<ProductCategoryReturnModels.ProductCategory>> ListProductCategoriesAsync(ProductCategoryRequestModels.Search rq);
    }
}
