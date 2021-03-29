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

        public class LockoutEndDate : QueryObject<User>
        {
            private DateTime? _lockoutEnd;

            public LockoutEndDate(DateTime? lockoutEnd)
            {
                _lockoutEnd = lockoutEnd;
            }

            protected override Expression<Func<User, bool>> AsExpression()
            {
                return o => DateTime.Compare((DateTime)o.LockoutEnd, (DateTime)_lockoutEnd) > 0 || DateTime.Compare((DateTime)o.LockoutEnd, (DateTime)_lockoutEnd) == 0;
            }
        }
    }
}
