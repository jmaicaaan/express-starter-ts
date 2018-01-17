#!/usr/bin/env bash
psql -U runner -c "CREATE DATABASE <%= databaseName %>;"
psql -U runner -c "CREATE USER <%= username %> WITH PASSWORD '<%= password %>'"
psql -U runner -c "GRANT ALL PRIVILEGES ON DATABASE <%= databaseName %> TO <%= username %>;"
npm run dbmigrate:up
