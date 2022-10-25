drop function if exists get_all_match_ids();
CREATE or REPLACE function get_all_match_ids() 
returns setof uuid
language sql
as $$
(SELECT id2 as match, id , CASE 
When pin1 =true and pin2 = true then true
else false
END AS pinned
  from matches2 m1
  where m1.id = auth.uid()
  ORDER BY BY pinned DESC, m1.created_at DESC  
  LIMIT 4)
UNION 
(SELECT id as match, id2, CASE 
When pin1 =true and pin2 = true then true
else false
END AS pinned 
  from matches2 m2
  where m2.id2 = auth.uid()
  ORDER BY BY pinned DESC, created_at desc  
  LIMIT 4)
  ;
$$; 