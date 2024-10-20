#!/bin/sh

# Install the dotnet-ef tool
dotnet tool install --global dotnet-ef

# Update the PATH environment variable to include the tools directory
export PATH="$PATH:/root/.dotnet/tools"

# Verify that dotnet-ef is available
echo "PATH: $PATH"
which dotnet-ef

# Run the migrations
dotnet ef database update -- "${ConnectionStrings__DefaultConnection}"

# Indicate that migrations are done
touch /tmp/migrations_done