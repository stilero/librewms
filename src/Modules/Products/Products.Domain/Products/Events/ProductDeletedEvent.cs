using BuildingBlocks.Domain.Primitives;

namespace Products.Domain.Products.Events;
public sealed class ProductDeletedEvent : DomainEvent
{
    public ProductDeletedEvent(Guid aggregateId) : base(aggregateId, nameof(Product), nameof(ProductDeletedEvent)) { }
}
