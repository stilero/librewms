namespace BuildingBlocks.Domain.Interfaces;
public interface IDomainEvent
{
    public Guid Id { get; }
    public string EventType { get; }
    public DateTime OccurredOn { get; }
    public Guid AggregateId { get; }
    public string AggregateType { get; } 
}
