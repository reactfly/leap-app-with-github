CREATE TABLE pasta_types (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DOUBLE PRECISION NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingredients (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'protein', 'vegetable', 'cheese'
  price DOUBLE PRECISION NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sauces (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DOUBLE PRECISION NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'preparing', 'ready', 'completed'
  total_price DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  pasta_type_id BIGINT NOT NULL REFERENCES pasta_types(id),
  sauce_id BIGINT NOT NULL REFERENCES sauces(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  item_price DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_item_ingredients (
  order_item_id BIGINT NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
  ingredient_id BIGINT NOT NULL REFERENCES ingredients(id),
  PRIMARY KEY (order_item_id, ingredient_id)
);

-- Insert sample data
INSERT INTO pasta_types (name, description, price, image_url) VALUES
('Penne', 'Massa tubular que segura o molho perfeitamente', 12.99, '/images/penne.jpg'),
('Espaguete', 'Massa longa e fina clássica, versátil para qualquer molho', 11.99, '/images/spaghetti.jpg'),
('Parafuso', 'Massa em formato de parafuso, ideal para molhos encorpados', 11.99, '/images/fusilli.jpg'),
('Penne Integral', 'Massa tubular integral, rica em fibras e nutrientes', 13.99, '/images/penne-integral.jpg'),
('Fettuccine', 'Massa larga e achatada, perfeita para molhos cremosos', 12.99, '/images/fettuccine.jpg');

INSERT INTO sauces (name, description, price, image_url) VALUES
('Alfredo', 'Rich and creamy parmesan cheese sauce', 3.99, '/images/alfredo.jpg'),
('Marinara', 'Classic tomato sauce with herbs and garlic', 2.99, '/images/marinara.jpg'),
('Carbonara', 'Creamy egg-based sauce with pancetta', 4.99, '/images/carbonara.jpg'),
('Pesto', 'Fresh basil, pine nuts, and parmesan sauce', 4.49, '/images/pesto.jpg'),
('Arrabbiata', 'Spicy tomato sauce with red peppers', 3.49, '/images/arrabbiata.jpg');

INSERT INTO ingredients (name, category, price, image_url) VALUES
('Grilled Chicken', 'protein', 4.99, '/images/chicken.jpg'),
('Italian Sausage', 'protein', 4.49, '/images/sausage.jpg'),
('Shrimp', 'protein', 6.99, '/images/shrimp.jpg'),
('Pancetta', 'protein', 3.99, '/images/pancetta.jpg'),
('Mushrooms', 'vegetable', 2.49, '/images/mushrooms.jpg'),
('Bell Peppers', 'vegetable', 1.99, '/images/peppers.jpg'),
('Cherry Tomatoes', 'vegetable', 2.49, '/images/tomatoes.jpg'),
('Spinach', 'vegetable', 1.99, '/images/spinach.jpg'),
('Broccoli', 'vegetable', 2.49, '/images/broccoli.jpg'),
('Parmesan Cheese', 'cheese', 2.99, '/images/parmesan.jpg'),
('Mozzarella', 'cheese', 2.49, '/images/mozzarella.jpg'),
('Ricotta', 'cheese', 2.99, '/images/ricotta.jpg');
