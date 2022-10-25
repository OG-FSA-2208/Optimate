drop function if exists get_all_matches();
CREATE or REPLACE function get_all_matches() 
returns table("match" uuid, "id" uuid, "id2" uuid, "pin1" boolean, "pin2" boolean, "pinned" boolean)
language plpgsql
as $$
BEGIN
  return query 
    (
      SELECT m3.id2 as match, m1.id, m1.id2, m1.pin1, m1.pin2, CASE 
    When (m1.pin1 = true and m1.pin2 = true) then true
    else false
    END AS pinned
      from matches2 m1
      join matches2 m3
      on m1.id = m3.id and m1.id2 = m3.id2
      where m1.id = auth.uid()
      ORDER BY pinned DESC, m1.created_at DESC  
      LIMIT 4
      )
    UNION 
    (SELECT m4.id as match, m2.id, m2.id2, m2.pin1, m2.pin2, CASE 
    When (m2.pin1 = true and m2.pin2 = true) then true
    else false
    END AS pinned
      from matches2 m2
      join matches2 m4
      on m2.id = m4.id and m2.id2 = m4.id2
      where m2.id2 = auth.uid()
      ORDER BY pinned DESC, m2.created_at desc  
      LIMIT 4)
  ;
end;
$$; 