#!/usr/bin/env bash
psql -U postgres -c "CREATE DATABASE sample_test;"
psql -U postgres -c "CREATE USER sample WITH PASSWORD 'sample';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE sample_test TO sample;"
npm run dbmigrate:up