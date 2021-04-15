using AutoMapper;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Order
{
    public static class OrderReturnModel
    {
        public class Order
        {
            public Guid Id { get; set; }
            public DateTime OrderDate { get; set; }
            public string Address { get; set; }
            public string BuyerName { get; set; }
            public int BuyerPhone { get; set; }
            public string BuyerEmail { get; set; }
            public OrderStatuses Status { get; set; }
            public decimal Price { get; set; }
            public Guid ProductId { get; set; }
            public Product Product { get; set; }
            public int Quantity { get; set; }
        }
        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                CreateMap<Domain.Entities.Order, Order>();
            }
        }
    }
}
