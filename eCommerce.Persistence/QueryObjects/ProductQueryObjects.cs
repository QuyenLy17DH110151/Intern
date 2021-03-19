using eCommerce.Domain.Entities;
using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace eCommerce.Persistence.QueryObjects
{
    public static class ProductQueryObjects
    {
        public class ContainsKeyword : QueryObject<Product>
        {
            private string _keyword;

            public ContainsKeyword(string keyword)
            {
                _keyword = keyword;
            }

            protected override Expression<Func<Product, bool>> AsExpression()
            {
                return s => s.Name.Contains(_keyword);
            }
        }
    }
}
