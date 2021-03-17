using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Persistence.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _dbContext;

        private readonly GenericRepository<Order> _genericRepo;

        public IUnitOfWork UnitOfWork => _dbContext;

        public OrderRepository(ApplicationDbContext context)
        {
            _dbContext = context;
            _genericRepo = new GenericRepository<Order>(_dbContext.Set<Order>());
        }

        public async Task<PaginatedResult<Order>> searchAsync(SearchOrderModel rq)
        {
            var queryObject = QueryObject<Order>.Empty;

            //filter start date

            //fliter end date

            //fliter sum price bigger

            //fliter sum price smaller

            //fliter status

            //fliter id product

            //fliter username seller

            //order by

            if (!rq.Sort.Any())
            {
                rq.Sort.Add(new SortItem { FieldName = nameof(Order.IdentityKey) });

            }
            rq.Sort.ForEach(x => queryObject.AddOrderBy(x.FieldName, x.IsDescending));

            var result = await _genericRepo.SearchAsync(queryObject, rq.Pagination);
            return result;
        }
    }
}
