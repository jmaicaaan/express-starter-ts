#!/usr/bin/env bash
psql -U postgres -c "CREATE DATABASE <%= databaseName %>;"