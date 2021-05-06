using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.ProductRating
{
    public static class ProductRatingReturnModels
    {
        public class ProductRating
        {
            public string FullName { get; set; }

            public string Email { get; set; }

            public string ReviewTitle { get; set; }

            public string ReviewContent { get; set; }

        }

        public class MappingProductRating : Profile
        {
            public MappingProductRating()
            {
                CreateMap<Domain.Entities.ProductRating, ProductRating>();
            }
        }
    }
}
