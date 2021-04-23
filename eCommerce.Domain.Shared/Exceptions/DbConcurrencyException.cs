using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Shared.Exceptions
{
    public class DbConcurrencyException : Exception
    {
        public DbConcurrencyException()
            : base("RowVersion not equals")
        {
        }

    }
}
