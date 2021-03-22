using AutoMapper;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.Order
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepo;
        private readonly IMapper _mapper;
        
        public OrderService(IOrderRepository orderRepo, IMapper mapper)
        {
            _orderRepo = orderRepo;
            _mapper = mapper;
        }

        public async Task<PaginatedResult<OrderReturnModel.Order>> SearchOrdersAsync(OrderRequestModels.Search rq)
        {
            var order = await _orderRepo.SearchAsync(
                new SearchOrderModel
                {
                    StartDate = rq.StartDate,
                    EndDate = rq.EndtDate,
                    SumPriceBigger = rq.SumPriceBigger,
                    SumPriceSmaller = rq.SumPriceSmaller,
                    Status = rq.Status,
                    IdProduct = rq.IdProduct,
                    SellerUsername = rq.SellerUsername,
                    Pagination = new Pagination { PageIndex = rq.PageIndex, ItemsPerPage = rq.PageSize },
                });
            return _mapper.Map<PaginatedResult<OrderReturnModel.Order>>(order);
        }
    }
}
