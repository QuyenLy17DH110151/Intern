using eCommerce.Domain.Shared.Models;
using System;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.Order
{
    public interface IOrderService
    {
        Task<PaginatedResult<OrderReturnModel.Order>> SearchOrdersAsync(OrderRequestModels.Search rq);
        Task<bool> RejectOrderAsync(Guid Id);
        Task<int> ReduceQuantityAsync(Guid Id);
        Task<bool> CheckQuantityAsync(Guid productId, Guid orderId);
        Task<bool> AcceptOrderAsync(Guid Id);
    }
}