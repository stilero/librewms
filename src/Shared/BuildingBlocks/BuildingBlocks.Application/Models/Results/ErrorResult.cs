namespace BuildingBlocks.Application.Models.Results;
public class ErrorResult
{
    public string Code { get; }
    public string Message { get; }
    public ErrorType Type { get; }
    private ErrorResult(string code, string message, ErrorType type)
    {
        Code = code;
        Message = message;
        Type = type;
    }
    public static ErrorResult Failure(string code, string messag) => new(code, messag, ErrorType.Failure);
    public static ErrorResult Validation(string code, string messag) => new(code, messag, ErrorType.Validation);
    public static ErrorResult Unauthorized(string code, string messag) => new(code, messag, ErrorType.Unauthorized);
    public static ErrorResult NotFound(string code, string messag) => new(code, messag, ErrorType.NotFound);
}
