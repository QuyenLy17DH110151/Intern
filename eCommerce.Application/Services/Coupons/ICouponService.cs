﻿using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.Coupons
{
    public interface ICouponService
    {
        /// <summary>
        /// Search coupons
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        Task<PaginatedResult<CouponReturnModels.Coupon>> SearchCouponsAsync(CouponRequestModels.Search req);
        
        /// <summary>
        /// Create new coupon
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<Guid> CreateAsync(CouponRequestModels.Create request);

        /// <summary>
        /// Get a coupon by id
        /// </summary>
        /// <param name="Id">CouponId</param>
        /// <returns></returns>
        Task<CouponReturnModels.Coupon> GetCouponByIdAsync(Guid Id);

        /// <summary>
        /// update coupon
        /// </summary>
        /// <param name="request"></param>
        /// <param name="couponId"></param>
        /// <returns></returns>
        Task UpdateCouponAsync(CouponRequestModels.Update request, Guid couponId);

        /// <summary>
        /// Delete coupon
        /// </summary>
        /// <param name="couponId"></param>
        /// <returns></returns>
        Task DeleteCouponAsync(Guid couponId);
    }
}
