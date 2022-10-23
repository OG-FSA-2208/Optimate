drop function if exists time_to_match();
CREATE or REPLACE function time_to_match() 
returns text
language plpgsql
as $$
declare
  timer text;
begin
  if (
        (select AGE(
            (select (now()::date)+1)
              , 
            (select created_at from matches2 m where id=auth.uid() ORDER BY created_at DESC limit 1)
        ))
        >
        (SELECT '1 day'::interval)
      )
      then return '0';
      else   
      return age(  
              (select (now()::date)+1)
                , 
              (select now()::timestamptz)
              )
              ;
  end if;
end;
$$;