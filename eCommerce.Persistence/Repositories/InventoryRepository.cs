﻿using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared.Models;
using eCommerce.Persistence.QueryObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Persistence.Repositories
{
    public class InventoryRepository : IInventoryRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly GenericRepository<Inventory> _genericRepo;

        public IUnitOfWork UnitOfWork => _dbContext;

        public InventoryRepository(ApplicationDbContext context)
        {
            _dbContext = context;
            _genericRepo = new GenericRepository<Inventory>(_dbContext.Set<Inventory>());
        }

        public async Task<PaginatedResult<Inventory>> SearchAsync(string username, SearchInventoryModel rq)
        {
            // filter
            var queryObject = QueryObject<Inventory>.Empty;

            if (!string.IsNullOrWhiteSpace(rq.Keyword))
            {
                var keyword = rq.Keyword;
                queryObject.And(new InventoryQueryObjects.ContainsKeyword(keyword));
            }
            if (username != "")
            {
                queryObject.And(new InventoryQueryObjects.ContainsUsername(username));
            }
            // orderby
            if (!rq.Sort.Any())
            {
                rq.Sort.Add(new SortItem { FieldName = nameof(User.IdentityKey) });
            }

            rq.Sort.ForEach(x => queryObject.AddOrderBy(x.FieldName, x.IsDescending));


            // execute
            var result = await _genericRepo.SearchAsync(queryObject, rq.Pagination);
            return result;
        }

        public void AddAsync(Inventory inventory)
        {
            _genericRepo.Add(inventory);
        }

        public Task<Inventory> FindByIdAsync(Guid id)
        {
            return _genericRepo.GetByIdAsync(id);
        }

        public void UpdateAsync(Inventory inventory)
        {
            _genericRepo.Update(inventory);
        }
    }
}
