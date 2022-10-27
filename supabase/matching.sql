drop function if exists new_match();
CREATE or REPLACE function new_match() 
returns uuid
language sql
as $$
SELECT id from profiles p
where 
  status = 'single' 
  AND
    ((select "genderPreference" from profiles WHERE id = auth.uid()) IS NULL 
    OR
    (select "genderPreference" from profiles WHERE id = auth.uid()) = p.gender)
  and
    (p."genderPreference" IS null 
    OR 
    p."genderPreference" = (select gender from profiles WHERE id = auth.uid()))
  AND
    ((select "drinkingPreference" from profiles WHERE id = auth.uid()) IS NULL 
    or
    (select "drinkingPreference" from profiles WHERE id = auth.uid()) = p.drinker)
  AND
    (p."drinkingPreference" IS null 
    or 
    p."drinkingPreference" = (select drinker from profiles WHERE id = auth.uid()))
  AND
    ((select "smokingPreference" from profiles WHERE id = auth.uid()) IS NULL 
    or
    (select "smokingPreference" from profiles WHERE id = auth.uid()) = p.smoker)
  AND
    (p."smokingPreference" IS null 
    or 
    p."smokingPreference" = (select smoker from profiles WHERE id = auth.uid()))
  AND
    (
      (select "priorityPreference" from profiles WHERE id = auth.uid()) IS NULL 
      or
      (select "priorityPreference" from profiles WHERE id = auth.uid()) = 'unselected' 
      or
      (select "priorityPreference" from profiles WHERE id = auth.uid()) = p."priority"
    )
  AND
    (
      p."priorityPreference" IS NULL
      or
      p."priorityPreference" = 'unselected'
      or 
      p."priorityPreference" = (select "priority" from profiles WHERE id = auth.uid())
    )
  AND
    (select "age" from profiles WHERE id = auth.uid()) >= p."ageMin" 
  AND
    ((select "age" from profiles WHERE id = auth.uid()) <= p."ageMax"
    OR
    p."ageMax" IS NULL)
  AND
    p."age" >= (select "ageMin" from profiles WHERE id = auth.uid())
  AND
    (p."age" <= (select "ageMax" from profiles WHERE id = auth.uid())
    OR
    (select "ageMax" from profiles WHERE id = auth.uid()) IS NULL)
  AND
    p.id NOT IN (select id2 from matches2 m where m.id = auth.uid())
  AND
    auth.uid() NOT in (select id2 from matches2 m where m.id = p.id)
  AND p.id != auth.uid()
  AND 
      (
          (select created_at::date from matches2 m where m.id2 = p.id limit 1) IS NULL
        OR
              ((select created_at::date from matches2 m where m.id2 = p.id ORDER BY created_at DESC limit 1) 
            < 
              (select now()::DATE))
      )
    AND (
    p."matchByLL" IS NULL
    OR p."matchByLL" = false
    OR p."loveLangReceiving" IS NULL
    OR p."loveLangReceiving" = (
      SELECT
        "loveLangGiving"
      FROM
        profiles
      WHERE
        id = auth.uid()
    )
  )
  AND (
    (
      SELECT
        "matchByLL"
      FROM
        profiles
      WHERE
        id = auth.uid()
    ) IS NULL
    OR (
      SELECT
        "matchByLL"
      FROM
        profiles
      WHERE
        id = auth.uid()
    ) = false
    OR (
      SELECT
        "loveLangReceiving"
      FROM
        profiles
      WHERE
        id = auth.uid()
    ) IS NULL
    OR (
      SELECT
        "loveLangReceiving"
      FROM
        profiles
      WHERE
        id = auth.uid()
    ) = p."loveLangGiving"
  )
  AND
    (
      (select count(*) from matches2 where pin1 = true and pin2 = true and auth.uid() = p.id ) < 4
    )
  ORDER BY RANDOM()  
  LIMIT 1  
  ;
$$;