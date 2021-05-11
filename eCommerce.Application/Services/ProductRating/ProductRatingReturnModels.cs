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

        public class StartValue
        {
            public int NumberStar { get; set; }
            public int Value { get; set; }
        }

        public class GetStarResponse
        {

            public Guid ProductId { get; set; }

            public string ProductName { get; set; }

            public int NumberStart { get; set; }

            public List<StartValue> StartValues { get; set; }

            public int MaxStart { get; set; }

            public int SumValue { get; set; }

            public Double AvgValue { get; set; }

            public void AddStart(int numberStar)
            {
                NumberStart++;

                //set SumValue And Avg Value
                SumValue += numberStar;

                AvgValue = (Double)10 * SumValue / NumberStart;
                int avg = (int)AvgValue;
                AvgValue = (Double)avg / 10;

                //check MaxStar < numberStar to do add all element star integer with < numberStar
                if (MaxStart < numberStar)
                {
                    for (; MaxStart <= numberStar; MaxStart++)
                    {
                        StartValues.Add(new StartValue { NumberStar = MaxStart, Value = 0 });
                    }
                    MaxStart = numberStar;
                }

                //check star is exist in arry after increment 1 value
                int i = 0;
                foreach (StartValue startValue in StartValues)
                {
                    if (startValue.NumberStar == numberStar)
                    {
                        ++StartValues[i].Value;
                        return;
                    }
                    i++;
                }


            }

        }
    }
}
