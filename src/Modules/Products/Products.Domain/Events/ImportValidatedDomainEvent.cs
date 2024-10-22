using MediatR;

namespace Products.Domain.Events;

public record ImportValidatedDomainEvent(Guid ImportId) : INotification;
