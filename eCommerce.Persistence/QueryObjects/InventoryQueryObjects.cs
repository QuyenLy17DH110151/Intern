using eCommerce.Domain.Entities;
using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace eCommerce.Persistence.QueryObjects
{
    public class InventoryQueryObjects
    {
        public class ContainsKeyword : QueryObject<Inventory>
        {
            private string _keyword;

            public ContainsKeyword(string keyword)
            {
                _keyword = keyword;
            }

            protected override Expression<Func<Inventory, bool>> AsExpression()
            {
                //Theo ten product
                return s => s.Product.Name.Contains(_keyword);
            }
        }
    }
}
