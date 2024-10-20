using BuildingBlocks.Application.Models.Results;

using MediatR;

namespace BuildingBlocks.Application.Messaging.Interfaces;
public interface ICommandHandler<TCommand, TResult> : IRequestHandler<TCommand, Result<TResult>>
    where TCommand : ICommand<TResult>;
