#!/usr/bin/env bash
psql -U DATABASE_POSTGRESQL_USERNAME -c "CREATE DATABASE <%= databaseName %>;"
psql -U DATABASE_POSTGRESQL_USERNAME -c "CREATE USER <%= username %> WITH PASSWORD '<%= password %>'"
psql -U DATABASE_POSTGRESQL_USERNAME -c "GRANT ALL PRIVILEGES ON DATABASE <%= databaseName %> TO <%= username %>;"
npm run dbmigrate:up
