using MediatR;

namespace Products.Domain.Events;

public record ImportLineInvalidDomainEvent(Guid ImportLineId) : INotification;
