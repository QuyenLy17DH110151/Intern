using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Products
{
    public static class ProductReturnModels
    {
        public class Product
        {
            public Guid Id { get; set; }

            public string Name { get; set; }

            public decimal Price { get; set; }

            public Guid CategoryId { get; set; }
        }

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                CreateMap<Domain.Entities.Product, Product>();
            }
        }
    }
}
