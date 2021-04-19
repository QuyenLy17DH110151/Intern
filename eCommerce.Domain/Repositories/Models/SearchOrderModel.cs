﻿using eCommerce.Domain.Enums;
using eCommerce.Domain.Shared;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Repositories.Models
{
    public class SearchOrderModel
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public OrderStatuses? Status { get; set; }
        public string OwnerId { get; set; }
        public string UserName { get; set; }
        public UserRoles Role { get; set; }

        public Pagination Pagination { get; set; } = new Pagination();
        public List<SortItem> Sort { get; set; } = new List<SortItem>();
    }
}
