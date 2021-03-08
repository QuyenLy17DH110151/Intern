using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Shared.Models
{
    public class PaginatedResult<T>
    {
        public IEnumerable<T> Items { get; set; }

        public int TotalRows { get; set; }

        public int TotalPages { get; set; }
    }

    public class Pagination
    {
        public int PageIndex { get; set; } = 0;

        public int ItemsPerPage { get; set; } = 10;

    }
}
