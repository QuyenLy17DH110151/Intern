using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Products
{
    public static class ProductRequestModels
    {
        public class Search
        {
            public string SearchTerm { get; set; }

            public int PageIndex { get; set; }

            public int PageSize { get; set; }

            public string Sort { get; set; }
        }

        public class Create //?Confirm: Template of req
        {
            public string Name { get; set; }
            public decimal Price { get; set; }
            public Guid CategoryId { get; set; }
            public Guid OwnerId { get; set; }
            // Có nên có this fields???
            public DateTime CreatedDate { get; set; }
            public string CreatedBy { get; set; }
        }
    }
}
