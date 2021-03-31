using AutoMapper;
using eCommerce.Domain.Entities;
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
            public Category Category { get; set; }
            public Guid OwnerId { get; set; }
            public DateTime LastUpdated { get; set; }
            public string LastUpdatedBy { get; set; }

            public List<Photo> Photos { get; set; }
            public Inventory Inventory { get; set; }
            public string Description { get; set; }
        }

        public class Category
        {
            public Guid Id { get; set; }

            public string Name { get; set; }
        }

        public class Photo
        {
            public string Url { get; set; }
            public Guid Id { get; set; }
        }

        public class Inventory
        {
            public int Quantity { get; set; }
        }

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                CreateMap<Domain.Entities.Product, Product>();
                CreateMap<Domain.Entities.ProductCategory, Category>();
                CreateMap<Domain.Entities.ProductPhoto, Photo>();
                CreateMap<Domain.Entities.Inventory, Inventory>();
            }
        }
    }
}
