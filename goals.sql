\echo 'Delete and recreate jobly db?'
\prompt 'Return for yes or ctrl-c to cancel > ' foo

DROP DATABASE goals;
CREATE DATABASE goals;
\c goals;

\i goals-schema.sql