using BuildingBlocks.Domain.Interfaces;

namespace BuildingBlocks.Domain.Primitives;
public abstract class AggregateRoot : IAggregateRoot
{
    private readonly List<IDomainEvent> _domainEvents = [];

    public IReadOnlyList<IDomainEvent> GetDomainEvents() => _domainEvents;

    public void ClearDomainEvents() => _domainEvents.Clear();

    public void RaiseDomainEvent(IDomainEvent domainEvent) => _domainEvents.Add(domainEvent);
}
