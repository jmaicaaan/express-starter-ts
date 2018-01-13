#!/bin/sh
psql -U postgres -c "CREATE DATABASE <%= databaseName %>;"