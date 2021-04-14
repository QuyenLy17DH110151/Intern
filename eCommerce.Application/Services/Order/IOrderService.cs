using eCommerce.Domain.Shared.Models;
using System;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.Order
{
    public interface IOrderService
    {
        Task<PaginatedResult<OrderReturnModel.Order>> SearchOrdersAsync(OrderRequestModels.Search rq);
        Task<bool> RejectOrder(Guid Id);
    }
}