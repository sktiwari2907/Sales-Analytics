create or replace function update_modified_at()
return trigger as $$
begin
  new.modified_at = now();
  return new;
end;
$$ LANGUAGE plpgsql


create trigger tgr_update_modified_at
before update on sales
for each row 
execute function update_modified_at();