﻿using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared.Models;
using eCommerce.Persistence.QueryObjects;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Persistence.Repositories
{
    class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _dbContext; //user...
        private readonly GenericRepository<Product> _genericRepo;  //product
        private readonly GenericRepository<ProductPhoto> _photoGenericRepo;  //product

        public IUnitOfWork UnitOfWork => _dbContext;

        public ProductRepository(ApplicationDbContext context)
        {
            _dbContext = context;
            _genericRepo = new GenericRepository<Product>(_dbContext.Set<Product>());
            _photoGenericRepo = new GenericRepository<ProductPhoto>(_dbContext.Set<ProductPhoto>());
        }

        public Product Add(Product product)
        {
            return _genericRepo.Add(product);    
        }

        public Task<IEnumerable<Product>> GetAllAsync()
        {
            return _genericRepo.GetAllAsync();
        }

        public Task<Product> GetByCatIdAsync(Guid catId)
        {
            return _genericRepo.GetByIdAsync(catId);
        }

        public void Update(Product product)
        {
            _genericRepo.Update(product);
        }

        public async Task<PaginatedResult<Product>> SearchAsync(SearchProductModel req)
        {
            // filter
            var queryObject = QueryObject<Product>.Empty;

            if (!string.IsNullOrWhiteSpace(req.Keyword))
            {
                var keyword = req.Keyword;
                queryObject.And(new ProductQueryObjects.ContainsKeyword(keyword));
            }

            // orderby
            if (!req.Sort.Any())
            {
                req.Sort.Add(new SortItem { FieldName = nameof(Product.IdentityKey) });
            }

            req.Sort.ForEach(x => queryObject.AddOrderBy(x.FieldName, x.IsDescending));


            // execute
            var result = await _genericRepo.SearchAsync(queryObject, req.Pagination);
            return result;
        }

        public Task<Product> GetByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Product> GetByCategoryIdAsync(Guid catId)
        {
            throw new NotImplementedException();
        }

        public Task<Product> GetProductByIdAsync(Guid id)
        {
            return _genericRepo.GetByIdAsync(id, x => x.Include(m => m.Photos));
        }

        public ProductPhoto UploadPhoto(ProductPhoto photo)
        {
            return _photoGenericRepo.Add(photo);
        }
    }
}
