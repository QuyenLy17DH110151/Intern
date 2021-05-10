using eCommerce.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using eCommerce.Application.Services.Order;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Application.Shared;
using eCommerce.Domain.Shared.Models;

namespace eCommerce.Application.Services.DashBoard
{
    public class DashBoardService : IDashBoardService
    {
        private readonly IUserRepository _userRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly ApplicationContext _appContext;
        public DashBoardService(IUserRepository userRepository, IOrderRepository orderRepository, IProductRepository productRepository, ApplicationContext appContext)
        {
            _userRepository = userRepository;
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _appContext = appContext;
        }

        public Task<int> GetCountComment()
        {
            throw new NotImplementedException();
        }

        public async Task<int> GetCountProductAsync()
        {
            var product = await _productRepository.SearchAsync(new SearchProductModel
            {
                Keyword = null,
                ProductCategoryName = null,
                OwnerName = null,

                Role = _appContext.Principal.Role,
                UserName = _appContext.Principal.Username,

                Pagination = new Pagination { PageIndex = 0, ItemsPerPage = 0 },
            });
            IEnumerable<Domain.Entities.Product> products = product.Items;
            int count = products.Count();
            return count;
            //return await _productRepository.CountProductAsync();
        }

        public async Task<int> GetCountUserAsync()
        {
            var order = await _orderRepository.SearchAsync(
                new SearchOrderModel
                {
                    StartDate = null,
                    EndDate = null,
                    Status = null,

                    OwnerId = _appContext.Principal.UserId,
                    OwnerUserName = _appContext.Principal.Username,
                    Role = _appContext.Principal.Role,

                    Pagination = new Pagination { PageIndex = 0, ItemsPerPage = 0 },
                });
            IEnumerable<Domain.Entities.Order> orders = order.Items;
            var count = orders.Where(o => o.Status == Domain.Enums.OrderStatuses.Approved)
                .Select(o=>o.BuyerName).Distinct()
                .Count();
            return count;
            //return await _userRepository.CountUsersAsync();
        }

        public async Task<decimal> GetSumEarningsAsync()
        {
            var order = await _orderRepository.SearchAsync(
                 new SearchOrderModel
                 {
                     StartDate = null,
                     EndDate = null,
                     Status = null,

                     OwnerId = _appContext.Principal.UserId,
                     OwnerUserName = _appContext.Principal.Username,
                     Role = _appContext.Principal.Role,

                     Pagination = new Pagination { PageIndex = 0, ItemsPerPage = 0 },
                 });
            IEnumerable<Domain.Entities.Order> orders = order.Items;
            var sum = orders.Where(o => o.Status == Domain.Enums.OrderStatuses.Approved).Sum(o => o.Price);
            return sum;
        }
    }
}
