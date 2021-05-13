using AutoMapper;
using eCommerce.Application.Shared;
using eCommerce.Application.Notification;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared.Exceptions;
using eCommerce.Domain.Shared.Models;
using eCommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using eCommerce.Domain.Enums;
using eCommerce.Application.Services.Coupons;
using eCommerce.Domain.Shared;

namespace eCommerce.Application.Services.Order
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepo;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;
        private readonly ApplicationContext _appContext;
        private readonly IInventoryRepository _inventoryRepo;
        private readonly IProductRepository _productRepository;
        private readonly ICouponService _couponService;
        public OrderService(IOrderRepository orderRepo, IMapper mapper, IEmailSender emailSender, ApplicationContext appContext, IInventoryRepository inventoryRepository, IProductRepository productRepository, ICouponService couponService)
        {
            _orderRepo = orderRepo;
            _mapper = mapper;
            _emailSender = emailSender;
            _appContext = appContext;
            _inventoryRepo = inventoryRepository;
            _productRepository = productRepository;
            _couponService = couponService;
        }

        public async Task<bool> RejectOrderAsync(Guid Id)
        {
            var order = await _orderRepo.GetOrderByIdAsync(Id);
            if (order == null)
            {
                throw new EntityNotFound("Order");
            }
            await _orderRepo.UpdateStatusAsync(Id, Domain.Enums.OrderStatuses.Cancelled);
            await _orderRepo.UnitOfWork.SaveChangesAsync();
            SendEmailRejectOrder("eCommerce", order.BuyerEmail, Id);
            return true;
        }

        public async Task<PaginatedResult<OrderReturnModel.Order>> SearchOrdersAsync(OrderRequestModels.Search rq)
        {
            List<SortItem> sortRequest = new List<SortItem>();
            if (!String.IsNullOrEmpty(rq.OrderBy))
            {
                sortRequest = Sort.ListSort(rq.OrderBy);
            }
            var order = await _orderRepo.SearchAsync(
                new SearchOrderModel
                {
                    StartDate = rq.StartDate,
                    EndDate = rq.EndDate,
                    Status = rq.Status,
                    Sort = sortRequest,

                    OwnerId = _appContext.Principal.UserId,
                    OwnerUserName = _appContext.Principal.Username,
                    Role = _appContext.Principal.Role,

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

        private async Task<bool> CheckQuantityAsync(Guid productId, Guid orderId)
        {
            var order = await _orderRepo.GetOrderByIdAsync(orderId);
            var product = await _productRepository.GetProductByIdAsync(productId);
            await _inventoryRepo.CheckQuantityAsync(product.Inventory.Quantity, order.Quantity);

            return true;
        }

        private async Task<int> ReduceQuantityAsync(Guid Id)
        {
            var order = await _orderRepo.GetOrderByIdAsync(Id);
            var inventory = await _inventoryRepo.ReduceQuantityAsync(order.Product.Inventory.Id, order.Quantity);

            return inventory;
        }

        private void SendEmailAccept(string from, string to, Guid id)
        {
            string html = "<!DOCTYPE html>";
            html += "<html>";
            html += "<head>";
            html += "<meta chahtmlet='utf-8'>";
            html += "</head>";
            html += "<body>";
            html += "<h1>Your order is Accepted </h1>";
            html += "<input type='hidden' name='key' value='" + "'/>";
            html += "<input type='hidden' name='email' value='" + to + "'/>";
            html += $"Order id : {id} is Accepted ";
            html += "</form>";
            html += "</body>";
            html += "</html>";

            _emailSender.SendEmail(from, to, "Accept Order", html);
        }

        public async Task<bool> AcceptOrderAsync(Guid Id)
        {
            var order = await _orderRepo.GetOrderByIdAsync(Id);
            if (order == null)
            {
                throw new EntityNotFound("Order");
            }

            await CheckQuantityAsync(order.ProductId, Id);
            await ReduceQuantityAsync(Id);
            await _orderRepo.UpdateStatusAsync(Id, Domain.Enums.OrderStatuses.Approved);
            await _orderRepo.UnitOfWork.SaveChangesAsync();
            SendEmailAccept("eCommerce", order.BuyerEmail, Id);
            return true;
        }

        public async Task CreateAsync(OrderRequestModels.Create req)
        {
            decimal percent = 0;
            var coupon = await _couponService.GetCouponByCodeAsync(req.couponCode);

            if(coupon != null)
            {
                percent = _couponService.IsValidCoupon(coupon);
            }

            foreach (var product in req.Products)
            {
                var order = new eCommerce.Domain.Entities.Order()
                {
                    BuyerEmail = req.BuyerEmail,
                    BuyerName = req.BuyerName,
                    BuyerPhone = req.BuyerPhone,
                    Address = req.Address,
                    ProductId = product.Id,
                    Price = product.Price,
                    ActualPrice = product.Price - product.Price * percent / 100,
                    Quantity = product.Quantity,
                    Status = OrderStatuses.New,
                };
                _orderRepo.Add(order);
            }

            await _orderRepo.UnitOfWork.SaveChangesAsync();
        }
    }
}
