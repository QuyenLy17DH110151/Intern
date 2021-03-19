using eCommerce.Domain.Entities;
using eCommerce.Domain.Enums;
using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace eCommerce.Persistence.QueryObjects
{
    public static class OrderQueryObject
    {
        public class OrderDateAfter : QueryObject<Order>
        {
            private DateTime _dateTime;

            public OrderDateAfter(DateTime dateTime)
            {
                _dateTime = dateTime;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => DateTime.Compare(o.OrderDate, _dateTime) < 0 || DateTime.Compare(o.OrderDate, _dateTime) == 0;
            }
        }

        public class OrderDateBefore : QueryObject<Order>
        {
            private DateTime _dateTime;

            public OrderDateBefore(DateTime dateTime)
            {
                _dateTime = dateTime;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => DateTime.Compare(o.OrderDate, _dateTime) > 0 || DateTime.Compare(o.OrderDate, _dateTime) == 0;
            }
        }

        public class TotalPriceBigger : QueryObject<Order>
        {
            private Decimal _price;

            public TotalPriceBigger(decimal price)
            {
                _price = price;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => o.Price * o.Quantity >= _price;
            }
        }

        public class TotalPriceSmaller : QueryObject<Order>
        {
            private Decimal _price;

            public TotalPriceSmaller(decimal price)
            {
                _price = price;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => o.Price * o.Quantity <= _price;

            }
        }

        public class HasStatus : QueryObject<Order>
        {
            private OrderStatuses _status;

            public HasStatus(OrderStatuses status)
            {
                _status = status;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => o.Status == _status;
            }
        }

        public class HasProduct : QueryObject<Order>
        {
            private string _idProduct;
            public HasProduct(string idProduct)
            {
                _idProduct = idProduct;
            }

            protected override Expression<Func<Order, bool>> AsExpression()
            {
                return o => o.ProductId.Equals(_idProduct);
            }
        }

        public class SellByUser : QueryObject<Order>
        {
            private string _username;
            public SellByUser(string username)
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
