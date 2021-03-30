using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;

namespace eCommerce.Application.Services.ProductCategory
{
    public static class ProductCategoryRequestModels
    {
        public class Search
        {
            public string SearchTerm { get; set; }

            public int PageIndex { get; set; }

            public int PageSize { get; set; }
        }

        public class Create
        {
            public string Name { get; set; }            

        }

        public class Update
        {
            public string Name { get; set; }
        }
    }
}
