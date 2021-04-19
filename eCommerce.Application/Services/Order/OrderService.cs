using AutoMapper;
using eCommerce.Application.Shared;
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
        private readonly ApplicationContext _appContext;

        public OrderService(IOrderRepository orderRepo, IMapper mapper, ApplicationContext appContext)
        {
            _orderRepo = orderRepo;
            _mapper = mapper;
            _appContext = appContext;
        }

        public async Task<PaginatedResult<OrderReturnModel.Order>> SearchOrdersAsync(OrderRequestModels.Search rq)
        {
            var order = await _orderRepo.SearchAsync(
                new SearchOrderModel
                {
                    StartDate = rq.StartDate,
                    EndDate = rq.EndDate,
                    Status = rq.Status,

                    OwnerId = _appContext.Principal.UserId,
                    UserName = _appContext.Principal.Username,
                    Role = _appContext.Principal.Role,

                    Pagination = new Pagination { PageIndex = rq.PageIndex, ItemsPerPage = rq.PageSize },
                });
            return _mapper.Map<PaginatedResult<OrderReturnModel.Order>>(order);
        }
    }
}
