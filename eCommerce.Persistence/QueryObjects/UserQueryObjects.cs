using eCommerce.Domain.Entities;
using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace eCommerce.Persistence.QueryObjects
{
    public static class UserQueryObjects
    {
        public class ContainsKeyword : QueryObject<User>
        {
            private string _keyword;

            public ContainsKeyword(string keyword)
            {
                _keyword = keyword;
            }

            protected override Expression<Func<User, bool>> AsExpression()
            {
                return s => s.Username.Contains(_keyword);
            }
        }
    }
}
