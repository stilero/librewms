using MediatR;

namespace Products.Domain.Events;

public record ImportLineProcessedDomainEvent(Guid ImportLineId) : INotification;
