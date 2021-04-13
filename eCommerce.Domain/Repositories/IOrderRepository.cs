using eCommerce.Domain.Entities;
using eCommerce.Domain.Enums;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared.Models;
using System;
using System.Threading.Tasks;

namespace eCommerce.Domain.Repositories

{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<PaginatedResult<Order>> SearchAsync(SearchOrderModel searchOrderModel);
        Task<Order> GetOrderById(Guid Id);
        Task<bool> UpdateStatus(Guid Id, OrderStatuses orderStatuses);
    }
}