using MediatR;

namespace Products.Domain.Events;

public record ImportProcessingDomainEvent(Guid ImportId) : INotification;
