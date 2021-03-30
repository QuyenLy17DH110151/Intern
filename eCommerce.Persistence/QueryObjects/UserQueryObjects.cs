﻿using eCommerce.Domain.Entities;
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
            private bool? _lockoutEnd;

            public LockoutEndDate(bool? lockoutEnd)
            {
                _lockoutEnd = lockoutEnd;
            }

            protected override Expression<Func<User, bool>> AsExpression()
            {
                return o => o.LockoutEnd != null && o.LockoutEnd <= DateTime.UtcNow;
            }
        }
    }
}
