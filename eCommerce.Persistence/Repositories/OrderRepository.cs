﻿using eCommerce.Domain.Entities;
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
            if (rq.StartDate.HasValue)
            {
                var startDate = rq.StartDate.Value;
                queryObject.And(new OrderQueryObject.FilterByStartDate(startDate));
            }

            //Filter by end date
            if (rq.EndDate.HasValue)
            {
                var endDate = rq.EndDate.Value;
                queryObject.And(new OrderQueryObject.FilterByEndDate(endDate));
            }

            //Filter by status
            if (rq.Status != null)
            {
                var status = (OrderStatuses)rq.Status;
                queryObject.And(new OrderQueryObject.HasStatus(status));
            }

            //Filter by role
            if (rq.Role != UserRoles.Admin)
            {
                var role = rq.Role;
                queryObject.And(new OrderQueryObject.HasRole(role));
            }

            //Filter by current user name
            if (!string.IsNullOrWhiteSpace(rq.OwnerUserName) && rq.Role != UserRoles.Admin)
            {
                var userName = rq.OwnerUserName;
                queryObject.And(new OrderQueryObject.FilterByCurrentUserName(userName));
            }

            //Order by
            if (!rq.Sort.Any())
            {
                rq.Sort.Add(new SortItem { FieldName = nameof(Order.IdentityKey) });
            }
            rq.Sort.ForEach(x => queryObject.AddOrderBy(x.FieldName, x.IsDescending));

            var result = await _genericRepo.SearchAsync(queryObject, rq.Pagination, x => x.Include(m => m.Product));
            return result;
        }

        private bool CheckPrice(Decimal price)
        {
            if (price == null)
            {
                return false;
            }
            if (price <= 0)
            {
                return false;
            }
            return true;
        }

        private bool CheckEndDate(DateTime endDate)
        {
            if (endDate == null)
            {
                return false;
            }
            DateTime now = DateTime.Now;
            if (DateTime.Compare(now, endDate) > 0)
            {
                return false;
            }

            return true;
        }

        private bool CheckStartDate(DateTime startDate)
        {
            if (startDate == null)
            {
                return false;
            }
            DateTime now = DateTime.Now;
            if (DateTime.Compare(now, startDate) < 0)
            {
                return false;
            }

            return true;
        }

        public async Task<Order> GetOrderByIdAsync(Guid Id)
        {
            var order = await _genericRepo.GetByIdAsync(Id);
            return order;
        }

        public async Task<bool> UpdateStatusAsync(Guid Id, OrderStatuses orderStatuses)
        {
            var order = await _genericRepo.GetByIdAsync(Id);
            order.Status = orderStatuses;
            return true;
        }

        public async Task<int> GetCountUsers(SearchOrderModel rq)
        {
            var queryObject = QueryObject<Order>.Empty;

            //Filter by current user name
            if (!string.IsNullOrWhiteSpace(rq.OwnerUserName) && rq.Role != UserRoles.Admin)
            {
                var userName = rq.OwnerUserName;
                queryObject.And(new OrderQueryObject.FilterByCurrentUserName(userName));
            }

            var result = await _genericRepo.SearchAsync(queryObject);
            return result.Where(o => o.Status == OrderStatuses.Approved)
                .Select(o => o.BuyerName).Distinct()
                .Count();
        }

        public async Task<decimal> GetSumEarningsAsync(SearchOrderModel rq)
        {
            var queryObject = QueryObject<Order>.Empty;

            //Filter by current user name
            if (!string.IsNullOrWhiteSpace(rq.OwnerUserName) && rq.Role != UserRoles.Admin)
            {
                var userName = rq.OwnerUserName;
                queryObject.And(new OrderQueryObject.FilterByCurrentUserName(userName));
            }

            var result = await _genericRepo.SearchAsync(queryObject);

            return result.Where(o => o.Status == OrderStatuses.Approved).Sum(o=>o.Price);
        }
    }
}
