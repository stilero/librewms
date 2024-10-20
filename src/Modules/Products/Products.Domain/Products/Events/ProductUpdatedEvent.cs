using BuildingBlocks.Domain.Primitives;

namespace Products.Domain.Products.Events;
public sealed class ProductUpdatedEvent : DomainEvent
{
    public Product Product { get; private set; }

    public ProductUpdatedEvent(Product product)
        : base(product?.Id ?? throw new ArgumentNullException(nameof(product)), nameof(Product), nameof(ProductUpdatedEvent))
    {
        Product = product ?? throw new ArgumentNullException(nameof(product));
    }
}
