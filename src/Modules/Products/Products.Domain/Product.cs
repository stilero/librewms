using BuildingBlocks.Domain.Primitives;
using Products.Domain.Products.Events;
using Products.Domain.Products.ValueObjects;

namespace Products.Domain;

public sealed class Product : AggregateRoot
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string Sku { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public string Manufacturer { get; private set; } = string.Empty;
    public string Category { get; private set; } = string.Empty;
    public string Status { get; private set; } = ProductStatus.Active;

    public static Product CreateNew(string name, string sku, string description, string manufacturer, string category)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = name,
            Sku = sku,
            Manufacturer = manufacturer,
            Status = ProductStatus.Active,
            Description = description,
            Category = category,
        };

        product.RaiseDomainEvent(new ProductCreatedEvent(product));

        return product;
    }

    public static Product Update(Guid id, string name, string sku, string status, string manufacturer, string description, string category)
    {
        var product = new Product
        {
            Id = id,
            Name = name,
            Sku = sku,
            Status = status,
            Manufacturer = manufacturer,
            Description = description,
            Category = category,
        };

        product.RaiseDomainEvent(new ProductUpdatedEvent(product));

        return product;
    }

    public void Delete() => RaiseDomainEvent(new ProductDeletedEvent(Id));

    public static Product Load(Guid id, string name, string sku, string description, string manufacturer, string category, string status) => new()
    {
        Id = id,
        Name = name,
        Sku = sku,
        Description = description,
        Manufacturer = manufacturer,
        Category = category,
        Status = status
    };
}
