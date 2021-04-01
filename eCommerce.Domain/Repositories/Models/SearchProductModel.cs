using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Repositories.Models
{
    public class SearchProductModel
    {
        public string Keyword { get; set; }

        public Pagination Pagination { get; set; } = new Pagination();

        public List<SortItem> Sort { get; set; } = new List<SortItem>();
        public Guid? Owner { get; set; }
        public string ProductCategoryName { get; set; }
        public string Role { get; set; }
    }
}
