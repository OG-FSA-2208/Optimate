drop function if exists new_match();
CREATE or REPLACE function new_match() 
returns uuid
language sql
as $$
SELECT id from profiles
where 
  status = 'Single' 
  AND
    ((select "genderPreference" from profiles WHERE id = auth.uid()) IS NULL 
    OR
    (select "genderPreference" from profiles WHERE id = auth.uid()) = gender)
  and
    ("genderPreference" IS null 
    OR 
    "genderPreference" = (select gender from profiles WHERE id = auth.uid()))
  AND
    ((select "drinkingPreference" from profiles WHERE id = auth.uid()) IS NULL 
    or
    (select "drinkingPreference" from profiles WHERE id = auth.uid()) = drinker)
  AND
    ("drinkingPreference" IS null 
    or 
    "drinkingPreference" = (select drinker from profiles WHERE id = auth.uid()))
  AND
    ((select "smokingPreference" from profiles WHERE id = auth.uid()) IS NULL 
    or
    (select "smokingPreference" from profiles WHERE id = auth.uid()) = smoker)
  AND
    ("smokingPreference" IS null 
    or 
    "smokingPreference" = (select smoker from profiles WHERE id = auth.uid()))
  AND
    (
      (select "priorityPreference" from profiles WHERE id = auth.uid()) IS NULL 
      or
      (select "priorityPreference" from profiles WHERE id = auth.uid()) = 'unselected' 
      or
      (select "priorityPreference" from profiles WHERE id = auth.uid()) = "priorityPreference"
    )
  AND
    (
      "priorityPreference" IS NULL
      or
      "priorityPreference" = 'unselected'
      or 
      "priorityPreference" = (select "priorityPreference" from profiles WHERE id = auth.uid())
    )
  AND
    (select "age" from profiles WHERE id = auth.uid()) >= "ageMin" 
  AND
    ((select "age" from profiles WHERE id = auth.uid()) <= "ageMax"
    OR
    "ageMax" IS NULL)
  AND
    "age" >= (select "ageMin" from profiles WHERE id = auth.uid())
  AND
    ("age" <= (select "ageMax" from profiles WHERE id = auth.uid())
    OR
    (select "ageMax" from profiles WHERE id = auth.uid()) IS NULL)
  AND
    id NOT IN (select id2 from matches2 m where m.id = auth.uid())
  AND
    auth.uid() NOT in (select id2 from matches2 m where m.id = profiles.id)
  AND id <> auth.uid()
  AND
    (select 
    (select timezone('America/New_York',
      (select created_at from matches2 m ORDER BY created_at DESC limit 1
      ))
    ) 
    < 
    (select timezone('America/New_York', now())::DATE)
    )
  ORDER BY RANDOM()  
  LIMIT 1  
  ;
$$;