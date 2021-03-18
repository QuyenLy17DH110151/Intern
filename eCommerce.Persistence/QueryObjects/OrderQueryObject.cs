using eCommerce.Domain.Entities;
using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace eCommerce.Persistence.QueryObjects
{
    public static class OrderQueryObject
    {
        public class QueryAferDate : QueryObject<Order>
        {
            private DateTime _dateTime;

            public QueryAferDate(DateTime dateTime)
            {
                _dateTime = dateTime;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => DateTime.Compare(o.OrderDate, _dateTime) < 0 || DateTime.Compare(o.OrderDate, _dateTime) == 0;
            }
        }

        public class QueryBeforeDate : QueryObject<Order>
        {
            private DateTime _dateTime;

            public QueryBeforeDate(DateTime dateTime)
            {
                _dateTime = dateTime;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => DateTime.Compare(o.OrderDate, _dateTime) > 0 || DateTime.Compare(o.OrderDate, _dateTime) == 0;
            }
        }

        public class QueryPriceBigger : QueryObject<Order>
        {
            private Decimal _price;

            public QueryPriceBigger(decimal price)
            {
                _price = price;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => o.Prices * o.Quantity >= _price;
            }
        }

        public class QueryPriceSmaller : QueryObject<Order>
        {
            private Decimal _price;

            public QueryPriceSmaller(decimal price)
            {
                _price = price;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => o.Prices * o.Quantity <= _price;

            }
        }

        public class QueryStatus : QueryObject<Order>
        {
            private bool _status;

            public QueryStatus(bool status)
            {
                _status = status;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => o.Status == _status;
            }
        }

        public class QueryIdProduct : QueryObject<Order>
        {
            private string _idProduct;
            public QueryIdProduct(string idProduct)
            {
                _idProduct = idProduct;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => o.ProductId.Equals(_idProduct);
            }
        }

        public class QueryUsernameSeller : QueryObject<Order>
        {
            private string _username;
            public QueryUsernameSeller(String username)
            {
                _username = username;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => o.Product.Owner.Username.Equals(_username);
            }
        }
    }
}
