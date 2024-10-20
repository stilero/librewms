#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/azure-functions/dotnet-isolated:4-dotnet-isolated8.0 AS base
WORKDIR /home/site/wwwroot
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Functions/LibreWms.FunctionApp/LibreWms.FunctionApp.csproj", "src/Functions/LibreWms.FunctionApp/"]
COPY ["src/Modules/Products/Products.Infrastructure/Products.Infrastructure.csproj", "src/Modules/Products/Products.Infrastructure/"]
COPY ["src/Modules/Products/Products.API/Products.API.csproj", "src/Modules/Products/Products.API/"]
COPY ["src/Modules/Products/Products.Application/Products.Application.csproj", "src/Modules/Products/Products.Application/"]
COPY ["src/Shared/BuildingBlocks/BuildingBlocks.Application/BuildingBlocks.Application.csproj", "src/Shared/BuildingBlocks/BuildingBlocks.Application/"]
COPY ["src/Shared/BuildingBlocks/BuildingBlocks.Domain/BuildingBlocks.Domain.csproj", "src/Shared/BuildingBlocks/BuildingBlocks.Domain/"]
COPY ["src/Modules/Products/Products.Domain/Products.Domain.csproj", "src/Modules/Products/Products.Domain/"]
COPY ["src/Modules/Products/Products.Infrastructure.Data/Products.Infrastructure.Data.csproj", "src/Modules/Products/Products.Infrastructure.Data/"]
COPY ["src/Shared/BuildingBlocks/BuildingBlocks.Infrastructure.Data/BuildingBlocks.Infrastructure.Data.csproj", "src/Shared/BuildingBlocks/BuildingBlocks.Infrastructure.Data/"]
RUN dotnet restore "./src/Functions/LibreWms.FunctionApp/LibreWms.FunctionApp.csproj"
COPY . .
WORKDIR "/src/src/Functions/LibreWms.FunctionApp"
RUN dotnet build "./LibreWms.FunctionApp.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./LibreWms.FunctionApp.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /home/site/wwwroot
COPY --from=publish /app/publish .
ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true