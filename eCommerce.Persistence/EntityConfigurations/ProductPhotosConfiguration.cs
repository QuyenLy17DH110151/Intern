using eCommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Persistence.EntityConfigurations
{
    class ProductPhotosConfiguration : IEntityTypeConfiguration<ProductPhotos>
    {
        public void Configure(EntityTypeBuilder<ProductPhotos> builder)
        {
            // table
            builder.ToTable(nameof(ProductPhotos));
            builder.ConfigureByConvention();
        }
    }
}
