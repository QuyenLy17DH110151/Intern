using eCommerce.Domain.Entities;
using eCommerce.Domain.Enums;
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

            //filter after date

            if (CheckStartDate(rq.StartDate))
            {
                var startDate = rq.StartDate;
                queryObject.And(new OrderQueryObject.OrderDateAfter(startDate));
            }

            //fliter begin date

            if (CheckEndDate(rq.EndDate))
            {
                var endDate = rq.EndDate;
                queryObject.And(new OrderQueryObject.OrderDateBefore(endDate));
            }

            //fliter sum price bigger

            if (CheckPrice(rq.SumPriceBigger))
            {
                var priceBigger = rq.SumPriceBigger;
                queryObject.And(new OrderQueryObject.TotalPriceBigger(priceBigger));
            }

            //fliter sum price smaller
            if (CheckPrice(rq.SumPriceSmaller))
            {
                var priceSmaller = rq.SumPriceSmaller;
                queryObject.And(new OrderQueryObject.TotalPriceSmaller(priceSmaller));
            }
            //fliter status
            if (rq.Status != null)
            {
                var status = rq.Status;
                queryObject.And(new OrderQueryObject.HasStatus(status));
            }

            //fliter id product

            if(rq.IdProduct != null)
            {
                var idProduct = rq.IdProduct;
                queryObject.And(new OrderQueryObject.HasProduct(idProduct));
            }

            //fliter username seller
            if (!string.IsNullOrWhiteSpace(rq.SellerUsername))
            {
                var usernameSeller = rq.SellerUsername;
                queryObject.And(new OrderQueryObject.SellByUser(usernameSeller));
            }
            //order by

            if (!rq.Sort.Any())
            {
                rq.Sort.Add(new SortItem { FieldName = nameof(Order.IdentityKey) });

            }
            rq.Sort.ForEach(x => queryObject.AddOrderBy(x.FieldName, x.IsDescending));

            var result = await _genericRepo.SearchAsync(queryObject, rq.Pagination);
            return result;
        }

        private bool CheckPrice(Decimal price)
        {
            if (price == null)
            {
                return false;
            }
            if (price < 0)
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
            if(startDate == null)
            {
                return false;
            }
            DateTime now = DateTime.Now;
            if (DateTime.Compare(now, startDate)<0)
            {
                return false;
            }

            return true;
        }

        public async Task<Order> GetOrderById(Guid Id)
        {
            var order = await _genericRepo.GetByIdAsync(Id);
            return order;
        }

        public async Task<bool> UpdateStatus(Guid Id, OrderStatuses orderStatuses)
        {
            var order = await _genericRepo.GetByIdAsync(Id);
            order.Status = orderStatuses;
            return true;
        }
    }
}
