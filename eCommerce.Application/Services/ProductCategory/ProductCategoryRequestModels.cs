using AutoMapper;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Runtime.CompilerServices;
using System.Text;

namespace eCommerce.Application.Services.ProductCategory
{
    public static class ProductCategoryRequestModels
    {
        public class Search
        {
            public string SearchTerm { get; set; }

            public int PageIndex { get; set; }

            public int PageSize { get; set; }
        }

        public class Create
        {
            public string Name { get; set; }

            public string C1Lable { get; set; }

            public string C1Options { get; set; }

            public string C2Lable { get; set; }

            public string C2Options { get; set; }

            public string C3Lable { get; set; }

            public string C3Options { get; set; }

            public string C4Lable { get; set; }

            public string C4Options { get; set; }

            public string C5Lable { get; set; }

            public string C5Options { get; set; }
        }

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                CreateMap<Create,Domain.Entities.ProductCategory>();
            }
        }

        public class CreateValidator : AbstractValidator<Create>
        {
            public CreateValidator()
            {
                RuleFor(c => c.Name).NotEmpty();
            }
        }

        public class Update
        {
            public string Name { get; set; }
        }
        
    }
}
