CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE IF NOT EXISTS public.ref_municipios_tom_ibge (
  codigo_municipio_tom  integer,
  codigo_municipio_ibge integer PRIMARY KEY,
  municipio_tom         text,
  municipio_ibge        text,
  uf                    char(2)
);
