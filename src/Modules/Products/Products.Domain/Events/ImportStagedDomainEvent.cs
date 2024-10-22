using MediatR;

namespace Products.Domain.Events;

public record ImportStagedDomainEvent(Guid ImportId) : INotification;
