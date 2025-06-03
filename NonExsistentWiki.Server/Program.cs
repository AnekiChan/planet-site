using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using NonExsistentWiki.Server.Models;
using NonExsistentWiki.Server.Services;
using NonExsistentWiki.Server.Services.Interfaces;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NonExsistentWiki.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var adminRole = new Role("admin");
            var userRole = new Role("user");
            var people = new List<User>
            {
                new User("admin123@gmail.com", "111", adminRole),
                new User("tom123@mail.ru", "12345", userRole)
            };

            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin", builder =>
                {
                    builder.WithOrigins("https://localhost:5173")
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
            });
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddAuthorization();
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = AuthOptions.ISSUER,
                        ValidateAudience = true,
                        ValidAudience = AuthOptions.AUDIENCE,
                        ValidateLifetime = true,
                        IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                        ValidateIssuerSigningKey = true
                    };
                });

            var app = builder.Build();
            app.UseCors("AllowOrigin");
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();
            /*
            app.Use(async (context, next) =>
            {
                var user = context.User;

                if (user.Identity.IsAuthenticated)
                {
                    var isAdmin = user.IsInRole("Admin");

                    if (context.Request.Path == "/" || context.Request.Path == "/Index")
                    {
                        if (isAdmin)
                        {
                            context.Response.Redirect("/Admin/Index");
                        }
                        else
                        {
                            context.Response.Redirect("/User/Index");
                        }
                    }
                }

                await next();
            });*/

            /*
            app.MapPost("/login", (User loginData) =>
            {
                User? person = people.FirstOrDefault(p => p.Email == loginData.Email && p.Password == loginData.Password);
                if (person is null)
                    return Results.Unauthorized();

                var claims = new List<Claim> {
                    new Claim(ClaimTypes.Name, person.Email), 
					new Claim(ClaimTypes.Role, person.Role.Name)
					//new Claim(ClaimTypes.DateOfBirth, person.Year.ToString())
					};
                // создаем JWT-токен
                var jwt = new JwtSecurityToken(
                        issuer: AuthOptions.ISSUER,
                        audience: AuthOptions.AUDIENCE,
                        claims: claims,
                        expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),
                        signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                var response = new
                {
                    access_token = encodedJwt,
                    username = person.Email,
                    role = person.Role.Name
                };

                return Results.Json(response);
            });
            */
            app.MapControllers();

            //app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
