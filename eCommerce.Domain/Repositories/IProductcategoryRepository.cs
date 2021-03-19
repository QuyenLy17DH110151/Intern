﻿using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Domain.Repositories
{
    public interface IProductcategoryRepository : IRepository<ProductCategory>
    {
        Task<PaginatedResult<ProductCategory>> SearchAsync(SearchProductCategoryModel rq);
    }
}