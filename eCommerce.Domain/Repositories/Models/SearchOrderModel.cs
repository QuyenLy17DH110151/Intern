using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Repositories.Models
{
    public class SearchOrderModel
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public decimal SumPriceBigger { get; set; }

        public decimal SumPriceSmaller { get; set; }

        public bool Status { get; set; }

        public string  IdProduct { get; set; }

        public string UsernameSeller { get; set; }

        public Pagination Pagination { get; set; } = new Pagination();

        public List<SortItem> Sort { get; set; } = new List<SortItem>();
    }
}
