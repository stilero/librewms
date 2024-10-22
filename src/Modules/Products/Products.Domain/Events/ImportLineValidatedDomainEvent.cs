using MediatR;

namespace Products.Domain.Events;

public record ImportLineValidatedDomainEvent(Guid ProductImportLineId) : INotification;
