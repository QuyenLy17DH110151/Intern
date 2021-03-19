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
            public Guid ProductId { get; set; }
            public Product Product { get; set; }
            public int Quantity { get; set; }
        }
        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                CreateMap<Domain.Entities.Inventory, Inventory>();
            }
        }
    }
}
