using Common.Domain.SeedWork;

using Products.Domain.Events;

namespace Products.Domain.AggregatesModel.ProductAggregate;

public class Product : Entity, IAggregateRoot
{
    public string Name { get; private set; } = string.Empty;
    public string Sku { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public string Manufacturer { get; private set; } = string.Empty;
    public string Category { get; private set; } = string.Empty;
    public string Status { get; private set; } = ProductStatus.Draft;

    protected Product()
    {
    }

    public static Product CreateNew(string name, string sku, string description, string manufacturer, string category)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = name,
            Sku = sku,
            Manufacturer = manufacturer,
            Status = ProductStatus.Draft,
            Description = description,
            Category = category,
        };

        product.AddDomainEvent(new ProductCreatedEventDomainEvent(product));

        return product;
    }

    public void Update(string newName, string newSKU, string newManufacturer, string newDescription, string newCategory)
    {
        Name = newName;
        Sku = newSKU;
        Manufacturer = newManufacturer;
        Description = newDescription;
        Category = newCategory;

        AddDomainEvent(new ProductUpdatedDomainEvent(this));
    }

    public void SetStatus(string newStatus)
    {
        Status = newStatus;
        AddDomainEvent(new ProductStatusChangedDomainEvent(this));
    }    
}
