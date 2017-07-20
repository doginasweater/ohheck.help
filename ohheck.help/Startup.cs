using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ohheck.help.Models.Data;
using System.Net.Http;
using System.Net.Http.Headers;
using ohheck.help.Models;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Logging;
using ohheck.help.Services;
using Newtonsoft.Json;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace ohheck.help {
    public class Startup {
        public Startup(IHostingEnvironment env) {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment()) {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets<Startup>();
            }

            builder.AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("identity")));

            services.AddDbContext<HeckingContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("hecking")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options => {
                options.User.RequireUniqueEmail = true;
                options.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents {
                    OnRedirectToLogin = context => {
                        context.Response.Clear();
                        context.Response.StatusCode = 401;

                        return Task.FromResult(0);
                    }
                };
            });

            services.Configure<Secrets>(Configuration);

            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
            services.AddTransient<PasswordHasher<ApplicationUser>>();

            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            });

            var client = new HttpClient();
            client.BaseAddress = new Uri("http://schoolido.lu/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            services.AddSingleton(client);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory) {
            loggerFactory.AddConsole();

            var secretKey = Configuration["secretkey"];
            var signingkey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));

            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();

                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });

                app.UseJwtBearerAuthentication(new JwtBearerOptions {
                    AutomaticAuthenticate = true,
                    AutomaticChallenge = true,
                    TokenValidationParameters = new TokenValidationParameters {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = signingkey,
                        ValidateIssuer = false,
                        ValidateLifetime = false,
                        ValidateAudience = false,
                    },
                    Events = new JwtBearerEvents {
                        OnAuthenticationFailed = context => {
                            context.Response.Clear();
                            context.Response.StatusCode = 401;

                            return Task.FromResult(0);
                        }
                    }
                });
            } else {
                app.UseExceptionHandler("/Home/Error");

                app.UseJwtBearerAuthentication(new JwtBearerOptions {
                    AutomaticAuthenticate = true,
                    AutomaticChallenge = true,
                    TokenValidationParameters = new TokenValidationParameters {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = signingkey,
                        ValidateIssuer = true,
                        ValidateLifetime = true,
                        ValidateAudience = true,
                        ValidIssuer = Configuration.GetSection("SiteConfig:url").Value,
                        ValidAudience = Configuration.GetSection("SiteConfig:url").Value,
                    },
                    Events = new JwtBearerEvents {
                        OnAuthenticationFailed = context => {
                            context.Response.Clear();
                            context.Response.StatusCode = 401;

                            return Task.FromResult(0);
                        }
                    }
                });
            }

            app.UseStaticFiles();

            app.UseIdentity();

            app.UseMvc(routes => {
                routes.MapRoute(
                    name: "admin",
                    template: "admin/{action}/{id?}",
                    defaults: new { controller = "Admin", Action = "Index" });

                routes.MapRoute(
                    name: "admin-error",
                    template: "admin/{*url}",
                    defaults: new { controller = "Admin", Action = "Error" });

                routes.MapRoute(
                    name: "account",
                    template: "account/{action}/{id?}",
                    defaults: new { controller = "Account", Action = "Login" });

                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}