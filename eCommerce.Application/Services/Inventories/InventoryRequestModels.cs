using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Inventories
{
    public class InventoryRequestModels
    {
        public class Search
        {
            public string SearchTerm { get; set; }

            public int PageIndex { get; set; }

            public int PageSize { get; set; }
        }
    }
}
