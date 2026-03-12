CREATE SCHEMA IF NOT EXISTS public;

DROP TABLE IF EXISTS public.ref_municipios_tom_ibge;

CREATE TABLE public.ref_municipios_tom_ibge (
  codigo_municipio_tom  integer,
  codigo_municipio_ibge integer,
  municipio_tom         text,
  municipio_ibge        text,
  uf                    char(2)
);