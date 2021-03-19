using eCommerce.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Order
{
    public static class OrderRequestModels
    {
        public class Search
        {
            public DateTime StartDate { get; set; }

            public DateTime EndtDate { get; set; }

            public decimal SumPriceBigger { get; set; }

            public decimal SumPriceSmaller { get; set; }

            public OrderStatuses Status { get; set; }

            public string IdProduct { get; set; }

            public string SellerUsername { get; set; }

            public int PageIndex { get; set; }

            public int PageSize { get; set; }

            public string Sort { get; set; }
        }
    }
}
