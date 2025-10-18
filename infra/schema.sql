-- infra/schema.sql
create extension if not exists "pgcrypto";

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  phone text UNIQUE,
  full_name text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE meals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text, -- breakfast/lunch/dinner/snack
  timestamp timestamptz DEFAULT now(),
  note text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE food_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_id uuid REFERENCES meals(id) ON DELETE CASCADE,
  name text,
  calories int,
  quantity numeric,
  image_path text,
  meta jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE preferences (
  user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  daily_calorie_goal int,
  diet_type text,
  allergies text[]
);
