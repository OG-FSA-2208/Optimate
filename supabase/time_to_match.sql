drop function if exists time_to_match();
CREATE or REPLACE function time_to_match() 
returns text
language plpgsql
as $$
declare
  timer text;
begin

  if (
        ((select AGE(
            (select (now()::date)+1)
              , 
            (select created_at from matches2 m where id=auth.uid() ORDER BY created_at DESC limit 1)
        ))
        >
        (SELECT '1 day'::interval))
        or
        (select created_at from matches2 m where id=auth.uid() limit 1) is null
      )
      then 
        if (
              (select AGE(
                    (select now())
                      , 
                    (select attempted_at from lastmatch m where id=auth.uid() ORDER BY attempted_at DESC limit 1)
              ))
              <
              (SELECT '1 minute'::interval)
            )
        then return age(  
                    (select attempted_at + '5 minute' from lastmatch m where id=auth.uid() ORDER BY attempted_at DESC limit 1)
                      , 
                    (select now())
                    );
        else return '0';
        end if;
      
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