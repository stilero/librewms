#!/bin/bash
# Start the SQL Server
/opt/mssql/bin/sqlservr &
pid="$!"
# Wait for SQL Server to start
echo "Waiting 30s for SQL server to start..."
sleep 30
# Execute SQL scripts
for script in /docker-entrypoint-initdb.d/*.sql; do
  if [ -f "$script" ]; then
    echo "Executing script: $script"
    /opt/mssql-tools/bin/sqlcmd -S localhost -C -U SA -P "${SA_PASSWORD}" -i "$script" -d master
  fi
done
# Wait for SQL Server to stop
wait "$pid"