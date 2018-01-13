#!/usr/bin/env bash
psql -U postgres -c "CREATE DATABASE <%= databaseName %>;" &&
psql -U postgres -c "CREATE USER <%= username %> WITH PASSWORD '<%= password %>';" &&
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE <%= databaseName %> TO <%= username %>;" &&
npm run dbmigrate:up