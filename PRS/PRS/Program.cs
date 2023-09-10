using Microsoft.EntityFrameworkCore;
using PRS.DBConnection;

// Create a web application builder.
var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Add services to the container.
builder.Services.AddControllers(); // Add the MVC framework for handling controllers.

// Configure CORS (Cross-Origin Resource Sharing) policy to allow requests from a specific origin.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.WithOrigins("http://localhost:5173") // Allow requests from this origin.
               .AllowAnyMethod() // Allow any HTTP method (GET, POST, etc.).
               .AllowAnyHeader(); // Allow any HTTP headers.
    });
});

// Configure Swagger/OpenAPI for documenting and testing your API.
builder.Services.AddEndpointsApiExplorer(); // Add API explorer services.
builder.Services.AddSwaggerGen(); // Add Swagger/OpenAPI generation services.

// Connect to the database using Entity Framework Core.
builder.Services.AddDbContext<DbConnector>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("conStr"))
);

var app = builder.Build(); // Build the application.

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Enable Swagger UI for development.
    app.UseSwaggerUI();
}

app.UseHttpsRedirection(); // Redirect HTTP requests to HTTPS.
app.UseCors("AllowReactApp"); // Use the CORS policy defined earlier.
app.UseAuthentication(); // Enable authentication.
app.UseAuthorization(); // Enable authorization.

app.MapControllers(); // Map controllers to routes.

app.Run(); // Start the application.
