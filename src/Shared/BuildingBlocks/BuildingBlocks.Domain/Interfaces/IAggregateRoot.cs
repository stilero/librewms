namespace BuildingBlocks.Domain.Interfaces;
public interface IAggregateRoot
{
    void ClearDomainEvents();
    void RaiseDomainEvent(IDomainEvent domainEvent);
    IReadOnlyList<IDomainEvent> GetDomainEvents();
}
