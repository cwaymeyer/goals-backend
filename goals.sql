\echo 'Delete and recreate goals db?'
\prompt 'Return for yes or ctrl-c to cancel > ' foo

DROP DATABASE goals;
CREATE DATABASE goals;
\connect goals;

\i goals-schema.sql