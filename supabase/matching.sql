DROP FUNCTION IF EXISTS new_match();

CREATE
OR REPLACE FUNCTION new_match() RETURNS uuid language SQL AS $ $
SELECT
  id
FROM
  profiles
WHERE
  STATUS = 'Single'
  AND (
    (
      SELECT
        "genderPreference"
      FROM
        profiles
      WHERE
        id = auth.uid()
    ) IS NULL
    OR (
      SELECT
        "genderPreference"
      FROM
        profiles
      WHERE
        id = auth.uid()
    ) = gender
  )
  AND (
    "genderPreference" IS NULL
    OR "genderPreference" = (
      SELECT
        gender
      FROM
        profiles
      WHERE
        id = auth.uid()
    )
  )
  AND (
    (
      SELECT
        "drinkingPreference"
      FROM
        profiles
      WHERE
        id = auth.uid()
    ) IS NULL
    OR (
      SELECT
        "drinkingPreference"
      FROM
        profiles
      WHERE
        id = auth.uid()
    ) = drinker
  )
  AND (
    "drinkingPreference" IS NULL
    OR "drinkingPreference" = (
      SELECT
        drinker
      FROM
        profiles
      WHERE
        id = auth.uid()
    )
  )
  AND (
    (
      SELECT
        "smokingPreference"
      FROM
        profiles
      WHERE
        id = auth.uid()
    ) IS NULL
    OR (
      SELECT
        "smokingPreference"
      FROM
        profiles
      WHERE
        id = auth.uid()
    ) = smoker
  )
  AND (
    "smokingPreference" IS NULL
    OR "smokingPreference" = (
      SELECT
        smoker
      FROM
        profiles
      WHERE
        id = auth.uid()
    )
  )
  AND (
    (
      SELECT
        "priorityPreference"
      FROM
        profiles
      WHERE
        id = auth.uid()
    ) IS NULL
    OR (
      SELECT
        "priorityPreference"
      FROM
        profiles
      WHERE
        id = auth.uid()
    ) = 'unselected'
    OR (
      SELECT
        "priorityPreference"
      FROM
        profiles
      WHERE
        id = auth.uid()
    ) = "priorityPreference"
  )
  AND (
    "priorityPreference" IS NULL
    OR "priorityPreference" = 'unselected'
    OR "priorityPreference" = (
      SELECT
        "priorityPreference"
      FROM
        profiles
      WHERE
        id = auth.uid()
    )
  )
  AND (
    SELECT
      "age"
    FROM
      profiles
    WHERE
      id = auth.uid()
  ) >= "ageMin"
  AND (
    (
      SELECT
        "age"
      FROM
        profiles
      WHERE
        id = auth.uid()
    ) <= "ageMax"
    OR "ageMax" IS NULL
  )
  AND "age" >= (
    SELECT
      "ageMin"
    FROM
      profiles
    WHERE
      id = auth.uid()
  )
  AND (
    "age" <= (
      SELECT
        "ageMax"
      FROM
        profiles
      WHERE
        id = auth.uid()
    )
    OR (
      SELECT
        "ageMax"
      FROM
        profiles
      WHERE
        id = auth.uid()
    ) IS NULL
  )
  AND id NOT IN (
    SELECT
      id2
    FROM
      matches2 m
    WHERE
      m.id = auth.uid()
  )
  AND auth.uid() NOT IN (
    SELECT
      id2
    FROM
      matches2 m
    WHERE
      m.id = profiles.id
  )
  AND id <> auth.uid()
  AND (
    SELECT
      (
        SELECT
          timezone(
            'America/New_York',
            (
              SELECT
                created_at
              FROM
                matches2 m
              ORDER BY
                created_at DESC
              LIMIT
                1
            )
          )
      ) < (
        SELECT
          timezone('America/New_York', NOW()) :: DATE
      )
  )
ORDER BY
  RANDOM()
LIMIT
  1;

$ $;