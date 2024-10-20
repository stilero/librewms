using BuildingBlocks.Application.Models.Results;

using MediatR;

namespace BuildingBlocks.Application.Messaging.Interfaces;
public interface ICommandHandler<TCommand> : IRequestHandler<TCommand, Result>
    where TCommand : ICommand;
