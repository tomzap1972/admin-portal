using AdminPortal.API.Data;
using AdminPortal.API.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

// MongoDB
builder.Services.AddSingleton<MongoDbContext>();

// Services
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<ContentService>();
builder.Services.AddSingleton<ConfigService>();

// CORS - allow Next.js frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowFrontend");
app.MapControllers();

app.Run();
