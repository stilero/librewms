using BuildingBlocks.Domain.Interfaces;

namespace BuildingBlocks.Domain.Primitives;
public abstract class DomainEvent : IDomainEvent
{
    public Guid Id { get; private set; }

    public DateTime OccurredOn { get; private set; }

    public Guid AggregateId { get; private set; }

    public string AggregateType { get; private set; } = string.Empty;

    public string EventType { get; private set; } = string.Empty;

    protected DomainEvent(Guid aggregateId, string aggregateType, string eventType)
    {
        Id = Guid.NewGuid();
        OccurredOn = DateTime.UtcNow;
        AggregateId = aggregateId;
        AggregateType = aggregateType;
        EventType = eventType;
    }
}
