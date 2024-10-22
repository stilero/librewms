using MediatR;

namespace Products.Domain.Events;

public record ImportFailedDomainEvent(Guid ImportId) : INotification;
