using AutoMapper;
using eCommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Inventories
{
   public class InventoryReturnModels
   {
        public class Inventory
        {
            public Guid Id { get; set; }
            public string ProductName { get; set; }
            public string OwnerUsername { get; set; }
            public int Quantity { get; set; }
            public string RowVersion { get; set; }
        }
        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                CreateMap<Domain.Entities.Inventory, Inventory>()
                    .ForMember(a=> a.ProductName, b => b.MapFrom(c => c.Product.Name))
                    .ForMember(a=> a.OwnerUsername, b => b.MapFrom(c => c.Product.Owner.Username))
                    .ForMember(a=> a.RowVersion, b => b.MapFrom(c => string.Join("", c.RowVersion)));
            }
        }
    }
}
