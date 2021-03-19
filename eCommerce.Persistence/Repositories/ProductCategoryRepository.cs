using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared.Models;
using eCommerce.Persistence.QueryObjects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Persistence.Repositories
{
    public class ProductCategoryRepository : IProductcategoryRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly GenericRepository<ProductCategory> _genericRepo;

        public IUnitOfWork UnitOfWork => _dbContext;

        public async Task<PaginatedResult<ProductCategory>> SearchAsync(SearchProductCategoryModel rq)
        {
            // filter
            var queryObject = QueryObject<ProductCategory>.Empty;

            if (!string.IsNullOrWhiteSpace(rq.Keyword))
            {
                var keyword = rq.Keyword;
                queryObject.And(new ProductCategoryQueryObjects.ContainsKeyword(keyword));
            }

            // execute
            var result = await _genericRepo.SearchAsync(queryObject, rq.Pagination);
            return result;
        }
    }
}
