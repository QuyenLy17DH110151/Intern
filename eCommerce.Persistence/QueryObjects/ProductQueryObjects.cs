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
        public class FilterByCategory : QueryObject<Product>
        {
            private string _keyword;

            public FilterByCategory(string keyword)
            {
                _keyword = keyword;
            }

            protected override Expression<Func<Product, bool>> AsExpression()
            {
                return s => s.Category.Name.Contains(_keyword);
            }
        }
        public class FilterBySeller : QueryObject<Product>
        {
            public string _keyword;

            public FilterBySeller(string keyword)
            {
                _keyword = keyword;
            }

            protected override Expression<Func<Product, bool>> AsExpression()
            {
                return s => s.Owner.Username.Contains(_keyword);
            }
        }
    }
}
