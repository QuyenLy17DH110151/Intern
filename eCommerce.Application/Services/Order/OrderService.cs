using AutoMapper;
using eCommerce.Application.Notification;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared.Exceptions;
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
        private readonly IEmailSender _emailSender;
        public OrderService(IOrderRepository orderRepo, IMapper mapper, IEmailSender emailSender)
        {
            _orderRepo = orderRepo;
            _mapper = mapper;
            _emailSender = emailSender;
        }

        public async Task<bool> RejectOrder(Guid Id)
        {
            var order = await _orderRepo.GetOrderById(Id);
            if (order == null)
            {
                throw new EntityNotFound("Order");
            }
            await _orderRepo.UpdateStatus(Id, Domain.Enums.OrderStatuses.Cancelled);
            await _orderRepo.UnitOfWork.SaveChangesAsync();
            SendEmailRejectOrder("eCommerce", order.BuyerEmail, Id);
            return true;
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
        private void SendEmailRejectOrder(string from, string to, Guid id)
        {
            string html = "<!DOCTYPE html>";
            html += "<html>";
            html += "<head>";
            html += "<meta chahtmlet='utf-8'>";
            html += "</head>";
            html += "<body>";
            html += "<h1> Order is Rejected </h1>";
            html += "<input type='hidden' name='key' value='" + "'/>";
            html += "<input type='hidden' name='email' value='" + to + "'/>";
            html += $"Order id : {id} is Reject ";
            html += "</form>";
            html += "</body>";
            html += "</html>";
            _emailSender.SendEmail(from, to, "Reject Order", html);
        }
    }
}
