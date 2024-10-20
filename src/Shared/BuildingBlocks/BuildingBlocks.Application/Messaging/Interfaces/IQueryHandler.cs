using BuildingBlocks.Application.Models.Results;

using MediatR;

namespace BuildingBlocks.Application.Messaging.Interfaces;
public interface IQueryHandler<TQuery, TResponse>
    : IRequestHandler<TQuery, Result<TResponse>>
    where TQuery : IQuery<TResponse>;
