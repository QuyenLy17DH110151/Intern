using eCommerce.Domain.Entities;
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

        public async Task<PaginatedResult<Order>> searchAsync(SearchOrderModel rq)
        {
            var queryObject = QueryObject<Order>.Empty;

            //filter after date

            if (checkStartDate(rq.StartDate))
            {
                var startDate = rq.StartDate;
                queryObject.And(new OrderQueryObject.QueryAferDate(startDate));
            }

            //fliter begin date

            if (checkEndDate(rq.EndDate))
            {
                var endDate = rq.EndDate;
                queryObject.And(new OrderQueryObject.QueryBeforeDate(endDate));
            }

            //fliter sum price bigger

            if (checkPrice(rq.SumPriceBigger))
            {
                var priceBigger = rq.SumPriceBigger;
                queryObject.And(new OrderQueryObject.QueryPriceBigger(priceBigger));
            }

            //fliter sum price smaller
            if (checkPrice(rq.SumPriceSmaller))
            {
                var priceSmaller = rq.SumPriceSmaller;
                queryObject.And(new OrderQueryObject.QueryPriceSmaller(priceSmaller));
            }
            //fliter status
            if (rq.Status != null)
            {
                var status = rq.Status;
                queryObject.And(new OrderQueryObject.QueryStatus(status));
            }

            //fliter id product

            if(rq.IdProduct != null)
            {
                var idProduct = rq.IdProduct;
                queryObject.And(new OrderQueryObject.QueryIdProduct(idProduct));
            }

            //fliter username seller
            if (!string.IsNullOrWhiteSpace(rq.UsernameSeller))
            {
                var usernameSeller = rq.UsernameSeller;
                queryObject.And(new OrderQueryObject.QueryUsernameSeller(usernameSeller));
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

        private bool checkPrice(Decimal price)
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

        private bool checkEndDate(DateTime endDate)
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

        private bool checkStartDate(DateTime startDate)
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
    }
}
