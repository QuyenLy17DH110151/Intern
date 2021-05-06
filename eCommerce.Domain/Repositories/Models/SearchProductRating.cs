﻿using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Repositories.Models
{
    public class SearchProductRating
    {

        public Pagination Pagination { get; set; } = new Pagination();

        public List<SortItem> Sort { get; set; } = new List<SortItem>();
    }
}
