// using Microsoft.EntityFrameworkCore;
// using System.Text;
// using System.Configuration;
// using dotnetapp.Models;


// var builder = WebApplication.CreateBuilder(args);

// // Add services to the container.
// builder.Services.AddDbContext<MyProjectDbContext>(options =>
// options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
// // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
// // builder.services.AddAuthorization();
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("CorsPolicy",
//         builder => builder
//             .AllowAnyOrigin()
//             .AllowAnyMethod()
//             .AllowAnyHeader());
// });

// var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseCors("CorsPolicy");

// app.UseHttpsRedirection();

// app.UseAuthorization();

// app.MapControllers();

// app.Run();

//using dotnetapp.Data;
//using Microsoft.Asp
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Configuration;
using dotnetapp.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<MyProjectDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}
app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
