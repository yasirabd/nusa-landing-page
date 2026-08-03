begin;

create temporary table cleanup_2027_2028_registrations
on commit drop
as
select id, bukti_transfer_url
from public.registrations
where academic_year = '2027/2028';

do $$
declare
  targeted_registration_count integer;
  remaining_receipt_count integer;
begin
  select count(*)
  into targeted_registration_count
  from cleanup_2027_2028_registrations;

  select count(*)
  into remaining_receipt_count
  from cleanup_2027_2028_registrations target
  join storage.objects object
    on object.bucket_id = 'payment_receipts'
   and object.name = target.bukti_transfer_url
  where target.bukti_transfer_url is not null;

  raise notice 'Targeted % registration row(s) for academic year 2027/2028.',
    targeted_registration_count;

  if remaining_receipt_count > 0 then
    raise exception
      'Cleanup stopped: % payment receipt object(s) still exist. Run the Storage cleanup script first.',
      remaining_receipt_count;
  end if;
end
$$;

do $$
declare
  deleted_test_count integer;
  deleted_audit_count integer;
  deleted_registration_count integer;
begin
  delete from public.student_tests
  where registration_id in (
    select id
    from cleanup_2027_2028_registrations
  );
  get diagnostics deleted_test_count = row_count;

  delete from public.admin_audit_logs
  where details ->> 'academic_year' = '2027/2028'
     or details ->> 'registration_id' in (
       select id::text
       from cleanup_2027_2028_registrations
     );
  get diagnostics deleted_audit_count = row_count;

  delete from public.registrations
  where id in (
    select id
    from cleanup_2027_2028_registrations
  );
  get diagnostics deleted_registration_count = row_count;

  raise notice 'Deleted % student test row(s).', deleted_test_count;
  raise notice 'Deleted % admin audit row(s).', deleted_audit_count;
  raise notice 'Deleted % registration row(s).', deleted_registration_count;
end
$$;

do $$
begin
  if exists (
    select 1
    from public.registrations
    where academic_year = '2027/2028'
  ) then
    raise exception
      'Cleanup verification failed: 2027/2028 registrations remain.';
  end if;

  if exists (
    select 1
    from public.student_tests test
    join cleanup_2027_2028_registrations target
      on target.id = test.registration_id
  ) then
    raise exception
      'Cleanup verification failed: related student test rows remain.';
  end if;
end
$$;

commit;
