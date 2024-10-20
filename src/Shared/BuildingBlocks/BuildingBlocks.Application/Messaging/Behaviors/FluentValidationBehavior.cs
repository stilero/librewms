using FluentValidation;

using MediatR;

namespace BuildingBlocks.Application.Messaging.Behaviors;
public class FluentValidationBehavior<TRequest, TResponse>(IEnumerable<IValidator<TRequest>> validators) : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly IEnumerable<IValidator<TRequest>> _validators = validators;

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(next, nameof(next));
        await Task.WhenAll(_validators.Select(v => v.ValidateAndThrowAsync(request, cancellationToken)));

        return await next();
    }
}
