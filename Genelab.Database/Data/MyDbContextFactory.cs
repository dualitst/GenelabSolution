using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Genelab.Database.Data
{
    public class MyDbContextFactory : IDesignTimeDbContextFactory<GenelabContext>
    {
        GenelabContext IDesignTimeDbContextFactory<GenelabContext>.CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var builder = new DbContextOptionsBuilder<GenelabContext>();
            var connectionString = configuration.GetConnectionString("SqlConnection");

            builder.UseSqlServer(connectionString);

            return new GenelabContext(builder.Options);
        }
    }
}
