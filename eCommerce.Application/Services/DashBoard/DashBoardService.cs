using eCommerce.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.DashBoard
{
    public class DashBoardService : IDashBoardService
    {
        private readonly IUserRepository _userRepository ;
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;

        public DashBoardService(IUserRepository userRepository, IOrderRepository orderRepository, IProductRepository productRepository)
        {
            _userRepository = userRepository;
            _orderRepository = orderRepository;
            _productRepository = productRepository;
        }

        public Task<int> GetCountComment()
        {
            throw new NotImplementedException();
        }

        public async Task<int> GetCountProduct()
        {
            return await _productRepository.CountProductAsync();
        }

        public async Task<int> GetCountUserAsync()
        {
            return await _userRepository.CountUsersAsync();
        }

        public async Task<decimal> GetSumEarnings()
        {
            return await _orderRepository.GetSumEarnings();
        }
    }
}
