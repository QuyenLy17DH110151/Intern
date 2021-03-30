using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.ProductCategory
{
    public static class ProductCategoryReturnModels
    {
        public class ProductCategory
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
        }

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                CreateMap<Domain.Entities.ProductCategory, ProductCategory>();
            }
        }
    }
}
