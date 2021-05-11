using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using static eCommerce.Application.Services.Inventories.InventoryReturnModels;

namespace eCommerce.Application.Services.ProductRating
{
    public static class ProductRatingReturnModels
    {
        public class ProductRating
        {
            public string FullName { get; set; }

            public Product Product { get; set; }

            public string Email { get; set; }

            public string ReviewTitle { get; set; }

            public string ReviewContent { get; set; }

            public int NumberStar { get; set; }

            public DateTime CreatedDate { get; set; }
        }

        public class MappingProductRating : Profile
        {
            public MappingProductRating()
            {
                CreateMap<Domain.Entities.ProductRating, ProductRating>();
            }
        }

        public class GetStarResponse
        {
            public int NumberStart { get; set; }
            public int StarOne { get; set; }
            public int StarTwo { get; set; }
            public int StarThree { get; set; }
            public int StarFour { get; set; }
            public int StarFive { get; set; }

            public void AddStart(int numberStar)
            {
                if (numberStar < 1 || numberStar > 5)
                {
                    return;
                }

                NumberStart++;

                if (numberStar == 1)
                {
                    StarOne++;
                    return;
                }

                if (numberStar == 2)
                {
                    StarTwo++;
                    return;
                }

                if (numberStar == 3)
                {
                    StarThree++;
                    return;
                }

                if (numberStar == 4)
                {
                    StarFour++;
                    return;
                }

                StarFive++;

            }
        }
    }
}
