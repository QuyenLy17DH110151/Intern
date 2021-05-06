﻿using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Persistence.Repositories
{
    public class ProductRatingReposiory : IProductRatingRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly GenericRepository<ProductRating> _genericRepo;
        public IUnitOfWork UnitOfWork => _dbContext;

        public ProductRatingReposiory(ApplicationDbContext context)
        {
            _dbContext = context;
            _genericRepo = new GenericRepository<ProductRating>(_dbContext.Set<ProductRating>());
        }

        public async Task<PaginatedResult<ProductRating>> SearchAsync(SearchProductRating searchProductRating)
        {
            var productRatingsQuery = QueryObject<ProductRating>.Empty;
            searchProductRating.Sort.ForEach(x => productRatingsQuery.AddOrderBy(x.FieldName, x.IsDescending));
            var result = await _genericRepo.SearchAsync(productRatingsQuery, searchProductRating.Pagination);
            return result;
        }

        public ProductRating Add(ProductRating productRating)
        {
            var rp = _genericRepo.Add(productRating);
            return rp;
        }
    }
}
