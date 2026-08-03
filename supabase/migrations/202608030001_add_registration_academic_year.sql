alter table public.registrations
  add column if not exists academic_year text;

update public.registrations
set academic_year = '2026/2027'
where academic_year is null;

alter table public.registrations
  drop constraint if exists registrations_academic_year_check;

alter table public.registrations
  add constraint registrations_academic_year_check
  check (academic_year in ('2026/2027', '2027/2028'));

alter table public.registrations
  alter column academic_year set not null,
  alter column academic_year set default '2027/2028';

create index if not exists registrations_academic_year_created_at_idx
  on public.registrations (academic_year, created_at desc);
