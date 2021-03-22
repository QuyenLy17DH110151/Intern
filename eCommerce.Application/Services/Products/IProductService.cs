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
        /// Create new product
        /// </summary>
        /// <param name="request"></param>
        /// <returns>ProductId</returns>
        Task<Guid> CreateAsync(ProductRequestModels.Create request);

        /// <summary>
        /// Get a product by Id
        /// </summary>
        /// <param name="Id">Product Id</param>
        /// <returns>ProductReturnModels.Product</returns>
        Task<ProductReturnModels.Product> GetProductByIdAsync(Guid Id);
    }
}
