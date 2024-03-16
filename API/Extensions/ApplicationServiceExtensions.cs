using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            //asta ca sa aiba incredere in put-uri plus alte chestii pe care le trimiti
            services.AddCors();
            services.AddHttpContextAccessor();
            services.AddTransient<ITokenService, TokenServices>();


            return services;

        }
    }
}
