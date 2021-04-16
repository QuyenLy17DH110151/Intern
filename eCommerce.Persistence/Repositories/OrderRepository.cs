using eCommerce.Domain.Entities;
using eCommerce.Domain.Enums;
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

        public async Task<PaginatedResult<Order>> SearchAsync(SearchOrderModel rq)
        {
            var queryObject = QueryObject<Order>.Empty;

            //Filter by start date
            if (rq.StartDate != null)
            {
                var startDate = (DateTime)rq.StartDate;
                queryObject.And(new OrderQueryObject.FilterByStartDate(startDate));
            }

            //Filter by end date
            if (rq.EndDate != null)
            {
                var endDate = (DateTime)rq.EndDate;
                queryObject.And(new OrderQueryObject.FilterByEndDate(endDate));
            }

            //Filter by status
            if (rq.Status != null)
            {
                var status = (OrderStatuses)rq.Status;
                queryObject.And(new OrderQueryObject.HasStatus(status));
            }

            //Filter by role
            if(rq.Role != UserRoles.Admin)
            {
                var role = rq.Role;
                queryObject.And(new OrderQueryObject.HasRole(role));
            }

            //Filter by current user name
            if (!string.IsNullOrWhiteSpace(rq.CurrentUserName) && rq.Role != UserRoles.Admin)
            {
                var currentUserName = rq.CurrentUserName;
                queryObject.And(new OrderQueryObject.FilterByCurrentUserName(currentUserName));
            }

            //Order by
            if (!rq.Sort.Any())
            {
                rq.Sort.Add(new SortItem { FieldName = nameof(Order.IdentityKey) });
            }
            rq.Sort.ForEach(x => queryObject.AddOrderBy(x.FieldName, x.IsDescending));

            var result = await _genericRepo.SearchAsync(queryObject, rq.Pagination, x=>x.Include(m=>m.Product));
            return result;
        }
    }
}
