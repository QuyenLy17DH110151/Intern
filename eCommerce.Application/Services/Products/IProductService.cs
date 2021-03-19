using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.Products
{
    public interface IProductService
    {
        /// <summary>
        /// Searchs products
        /// </summary>
        /// <param name="proId">productId</param>
        /// <returns></returns>
        Task<PaginatedResult<ProductReturnModels.Product>> SearchProductsAsync(ProductRequestModels.Search req);

        /// <summary>
        /// Get all products have CategoryId equal catId
        /// </summary>
        /// <param name="catId">categoryId</param>
        /// <returns></returns>
        Task<ProductReturnModels.Product> GetProductByCatIdAsync(Guid catId);

        /// <summary>
        /// Get all products in Database.
        /// </summary>
        /// <param name="proId">productId</param>
        /// <returns></returns>
        Task<ProductReturnModels.Product> GetAllProductAsync(Guid proId); //return list
    }
}
