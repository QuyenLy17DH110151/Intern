using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Entities
{
    public class ProductRating
    {
        public string FullName { get; set; }

        public Guid ProductId { get; set; }

        public Product Product { get; set; }

        public string Email { get; set; }

        public string ReviewTitle { get; set; }

        public string ReviewContent { get; set; }
    }
}
