﻿using System;
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

        public class Create
        {
            public string Name { get; set; }
            public decimal Price { get; set; }
            public Guid CategoryId { get; set; }
            public Guid OwnerId { get; set; }
            public string Description { get; set; }
            public List<string> Photos { get; set; }
        }

        public class UploadPhoto
        {
            public Guid ProductId { get; set; }
            public string Url { get; set; }
        }
    }
}
