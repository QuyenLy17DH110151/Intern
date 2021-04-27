using AutoMapper;
using eCommerce.Application.Shared;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared.Exceptions;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.Coupons
{
    class CouponService: ICouponService
    {
        private readonly ICouponRepository _couponRepo;
        private readonly IMapper _mapper;
        private readonly ApplicationContext _appContext;

        public CouponService(ICouponRepository couponRepo, IMapper mapper, ApplicationContext appContext)
        {
            _couponRepo = couponRepo;
            _mapper = mapper;
            _appContext = appContext;
        }

        public async Task<Guid> CreateAsync(CouponRequestModels.Create request)
        {
            var coupon = new Coupon()
            {
                Name=request.Name,
                Description = request.Description,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                MinPrice = request.MinPrice,
                Value = request.Value
            };

            _couponRepo.Add(coupon);
            await _couponRepo.UnitOfWork.SaveChangesAsync();
            return coupon.Id;
        }

        public async Task<CouponReturnModels.Coupon> GetCouponByIdAsync(Guid Id)
        {
            var coupon = await _couponRepo.GetCouponById(Id);
            if (coupon == null) throw new EntityNotFound("Coupon");
            return _mapper.Map<CouponReturnModels.Coupon>(coupon);
        }

        public async Task<PaginatedResult<CouponReturnModels.Coupon>> SearchCouponsAsync(CouponRequestModels.Search req)
        {
            var coupon = await _couponRepo.SearchAsync(new SearchCouponModel
            {
                Keyword=req.SearchTerm,
                Pagination=new Pagination { PageIndex=req.PageIndex, ItemsPerPage=req.PageSize},
                StartDate=req.StartDate,
                EndDate=req.EndDate,
                Value=req.Value,
                MinPrice=req.MinPrice,
            });

            return _mapper.Map<PaginatedResult<CouponReturnModels.Coupon>>(coupon);
        }

        public async Task UpdateCouponAsync(CouponRequestModels.Update request, Guid couponId)
        {
            var coupon = await _couponRepo.GetCouponById(couponId);

            if(coupon == null)
            {
                throw new EntityNotFound("Coupon");
            }

            //Update attribute
            coupon.Name = request.Name;
            coupon.StartDate = request.StartDate;
            coupon.EndDate = request.EndDate;
            coupon.Value = request.Value;
            coupon.MinPrice = request.MinPrice;

            // Save changed into DB
            _couponRepo.Update(coupon);
            await _couponRepo.UnitOfWork.SaveChangesAsync();
        }

        public async Task DeleteCouponAsync(Guid couponId)
        {
            var coupon = await _couponRepo.GetCouponById(couponId);

            if (coupon == null)
            {
                throw new EntityNotFound("Coupon");
            }

            _couponRepo.Detete(coupon);
            await _couponRepo.UnitOfWork.SaveChangesAsync();
        }
    } 
}
