﻿using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Repositories.Models
{
    public class SearchProductCategoryModel
    {
        public string Keyword { get; set; }

        public Pagination Pagination { get; set; } = new Pagination();
    }
}