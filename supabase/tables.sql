create table profile(
   id uuidv4,
   customer_id INT,
   contact_name VARCHAR(255) NOT NULL,
   phone VARCHAR(15),
   email VARCHAR(100),
   PRIMARY KEY(contact_id),
   CONSTRAINT fk_customer
      FOREIGN KEY(customer_id) 
	  REFERENCES customers(customer_id)
	  ON DELETE CASCADE
);
`psql database coonection string`
`pg_dump <connection_string_from_db_1>`
`https://egghead.io/lessons/supabase-pass-supabase-session-cookie-to-api-route-to-identify-user`