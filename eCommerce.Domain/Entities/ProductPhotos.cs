using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Entities
{
    public class ProductPhotos : Entity, IAuditable
    {
        public Product Product { get; set; }
        public string Url { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? LastUpdated { get; set; }
        public string LastUpdatedBy { get; set; }
    }
}
