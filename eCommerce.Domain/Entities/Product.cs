using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Entities
{
    public class Product : Entity, IAuditable
    {
        public string Name { get; set; }
        public decimal Price { get; set; }

        public Guid CategoryId { get; set; }
        public ProductCategory Category { get; set; }

        public Guid OwnerId { get; set; }
        public User Owner { get; set; }

        public List<ProductPhoto> Photos { get; set; }

        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? LastUpdated { get; set; }
        public string LastUpdatedBy { get; set; }
    }
}
