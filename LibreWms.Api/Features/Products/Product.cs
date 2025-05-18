namespace LibreWms.Api.Features.Products;

public class Product
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Sku { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string UnitOfMeasure { get; set; } = string.Empty;
    public decimal? Width { get; set; }
    public decimal? Height { get; set; }
    public decimal? Length { get; set; }
    public decimal Weight { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal CostPrice { get; set; }
    public int? MinStockLevel { get; set; }
    public int? MaxStockLevel { get; set; }
    public int? ReorderPoint { get; set; }
    public string? DefaultLocation { get; set; }
    public string? Barcode { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsTaxable { get; set; } = true;
    public int StockLevel { get; set; }
    public string Gtin { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsDeleted { get; set; } = false;
}