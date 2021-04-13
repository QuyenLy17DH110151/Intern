using eCommerce.Domain.Enums;
using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Entities
{
    public class Order : Entity, IAuditable
    {
        public DateTime OrderDate { get; set; }
        public string Address { get; set; }
        public string BuyerName { get; set; }
        public OrderStatuses Status { get; set; }
        public decimal Price { get; set; }
        public string BuyerPhone { get; set; }
        public Guid ProductId { get; set; } // Declare FK from Order refer to Product
        public Product Product { get; set; }
        public int Quantity { get; set; }
        public string BuyerEmail { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? LastUpdated { get; set; }
        public string LastUpdatedBy { get; set; }
    }
}
