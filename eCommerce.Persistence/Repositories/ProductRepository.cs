using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared;
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
        private readonly ApplicationDbContext _dbContext;
        private readonly GenericRepository<Product> _genericRepo;
        private readonly GenericRepository<ProductPhoto> _photoGenericRepo;

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

            // filter by category
            if (!string.IsNullOrWhiteSpace(req.ProductCategoryName))
            {
                var keyword = req.ProductCategoryName;
                queryObject.And(new ProductQueryObjects.FilterByCategory(keyword));
            }

            // filter by seller
            if (req.Role == UserRoles.Seller)
            {
                var keyword = req.UserName;
                queryObject.And(new ProductQueryObjects.FilterBySeller(keyword));
            }

            if (req.Role == UserRoles.Admin)
            {
                if (!string.IsNullOrWhiteSpace(req.OwnerName))
                {
                    var keyword = req.OwnerName;
                    queryObject.And(new ProductQueryObjects.FilterBySeller(keyword));
                }
            }

            // orderby
            if (!req.Sort.Any())
            {
                req.Sort.Add(new SortItem { FieldName = nameof(Product.IdentityKey) });
            }

            req.Sort.ForEach(x => queryObject.AddOrderBy(x.FieldName, x.IsDescending));

            // execute
            var result = await _genericRepo.SearchAsync(queryObject, req.Pagination, x => x.Include(m => m.Category).Include(m => m.Owner).Include(m => m.Photos));
            return result;
        }

        public async Task<IEnumerable<Product>> GetProductsByCategoryId(Guid catId)
        {
            var queryObject = QueryObject<Product>.Empty;

            // filter by categoryId  
            queryObject.And(new ProductQueryObjects.FilterByCategoryId(catId));

            var products = await _genericRepo.SearchAsync(queryObject, x => x.Include(m => m.Photos).Include(m => m.Inventory).Include(m => m.Category).Include(m=>m.Owner));
            return products;
        }

        public Task<Product> GetProductByIdAsync(Guid id)
        {
            return _genericRepo.GetByIdAsync(id, x => x.Include(m => m.Photos).Include(m => m.Inventory).Include(m => m.Category));
        }

        public ProductPhoto UploadPhoto(ProductPhoto photo)
        {
            return _photoGenericRepo.Add(photo);
        }

        public async Task<int> GetQuantityByProductIdAsync(Guid id)
        {
            var inventory = await _dbContext.Set<Inventory>().SingleOrDefaultAsync(x => x.ProductId == id);
            return inventory.Quantity;
        }

        public async Task<PaginatedResult<Product>> SearchPublicAsync(SearchProductModel req)
        {
            // filter
            var queryObject = QueryObject<Product>.Empty;

            if (!string.IsNullOrWhiteSpace(req.Keyword))
            {
                var keyword = req.Keyword;
                queryObject.And(new ProductQueryObjects.ContainsKeyword(keyword));
            }

            // filter by category
            if (!string.IsNullOrWhiteSpace(req.ProductCategoryName))
            {
                var keyword = req.ProductCategoryName;
                queryObject.And(new ProductQueryObjects.FilterByCategory(keyword));
            }

            if (!string.IsNullOrWhiteSpace(req.OwnerName))
            {
                var keyword = req.OwnerName;
                queryObject.And(new ProductQueryObjects.FilterBySeller(keyword));
            }

            // orderby
            if (!req.Sort.Any())
            {
                req.Sort.Add(new SortItem { FieldName = nameof(Product.IdentityKey) });
            }

            req.Sort.ForEach(x => queryObject.AddOrderBy(x.FieldName, x.IsDescending));

            // execute
            var result = await _genericRepo.SearchAsync(queryObject, req.Pagination, x => x.Include(m => m.Category).Include(m => m.Owner).Include(m => m.Photos));
            return result;
        }
    }
}
