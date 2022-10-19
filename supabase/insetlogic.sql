drop function if exists find_match();
CREATE or REPLACE function find_match() 
returns profiles
language plpgsql
as $$
declare
  matchid uuid;
  match_profile profiles%rowtype;
  last_match_time timestamp;
  paid_off_set int :=0;
begin
  select timezone('America/New_York', 
    (select created_at into last_match_time from matches2 where id = auth.uid() order by created_at DESC limit 1 offset paid_off_set)
    );
  if (last_match_time > (select timezone('America/New_York', now())::DATE::timestamp))
    Then raise exception 'yes %', last_match_time
		using detail = 'too early';
  end if;

  select new_match() into matchid;
  if matchid is null
  Then raise exception 'no matches %',matchid
		using detail = 'no matches were found, please try again later or lower your standards';
  else  
    select * into match_profile from profiles where id = matchid;
    INSERT INTO matches2 (id, id2)
    VALUES (auth.uid(), matchid);
    return match_profile;
  end if;
end;
$$;