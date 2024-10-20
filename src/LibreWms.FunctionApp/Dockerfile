#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/azure-functions/dotnet-isolated:4-dotnet-isolated8.0 AS base
WORKDIR /home/site/wwwroot
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["librewms/src/LibreWms.FunctionApp/LibreWms.FunctionApp.csproj", "librewms/src/LibreWms.FunctionApp/"]
COPY ["librewms/src/Modules/Products/Products.Infrastructure/Products.Infrastructure.csproj", "librewms/src/Modules/Products/Products.Infrastructure/"]
COPY ["librewms/src/Modules/Products/Products.API/Products.API.csproj", "librewms/src/Modules/Products/Products.API/"]
COPY ["librewms/src/Modules/Products/Products.Application/Products.Application.csproj", "librewms/src/Modules/Products/Products.Application/"]
COPY ["librewms/src/Shared/BuildingBlocks/BuildingBlocks.Application/BuildingBlocks.Application.csproj", "librewms/src/Shared/BuildingBlocks/BuildingBlocks.Application/"]
COPY ["librewms/src/Shared/BuildingBlocks/BuildingBlocks.Domain/BuildingBlocks.Domain.csproj", "librewms/src/Shared/BuildingBlocks/BuildingBlocks.Domain/"]
COPY ["librewms/src/Modules/Products/Products.Domain/Products.Domain.csproj", "librewms/src/Modules/Products/Products.Domain/"]
COPY ["librewms/src/Modules/Products/Products.Infrastructure.Data/Products.Infrastructure.Data.csproj", "librewms/src/Modules/Products/Products.Infrastructure.Data/"]
COPY ["librewms/src/Shared/BuildingBlocks/BuildingBlocks.Infrastructure.Data/BuildingBlocks.Infrastructure.Data.csproj", "librewms/src/Shared/BuildingBlocks/BuildingBlocks.Infrastructure.Data/"]
RUN dotnet restore "./librewms/src/LibreWms.FunctionApp/LibreWms.FunctionApp.csproj"
COPY . .
WORKDIR "/src/librewms/src/LibreWms.FunctionApp"
RUN dotnet build "./LibreWms.FunctionApp.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./LibreWms.FunctionApp.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /home/site/wwwroot
COPY --from=publish /app/publish .
ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true