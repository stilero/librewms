using MediatR;

namespace Products.Domain.Events;

public record ImportCompletedDomainEvent(Guid ImportId) : INotification;
