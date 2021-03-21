using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Entities
{
    public class Inventory : Entity
    {
        public Product Product { get; set; }
        public int Quantity { get; set; }
    }
}
