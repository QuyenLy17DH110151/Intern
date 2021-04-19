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
            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public OrderStatuses? Status { get; set; }
            public int PageIndex { get; set; }
            public int PageSize { get; set; }
            public string OrderBy { get; set; }
        }
    }
}
