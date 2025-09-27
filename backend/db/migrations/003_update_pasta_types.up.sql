-- Update pasta types to the new menu
-- First, clear existing data
DELETE FROM pasta_types;

-- Insert the new pasta types as specified
INSERT INTO pasta_types (name, description, price, image_url) VALUES
('Penne', 'Massa tubular que segura o molho perfeitamente', 12.99, '/images/penne.jpg'),
('Espaguete', 'Massa longa e fina clássica, versátil para qualquer molho', 11.99, '/images/spaghetti.jpg'),
('Parafuso', 'Massa em formato de parafuso, ideal para molhos encorpados', 11.99, '/images/fusilli.jpg'),
('Penne Integral', 'Massa tubular integral, rica em fibras e nutrientes', 13.99, '/images/penne-integral.jpg'),
('Fettuccine', 'Massa larga e achatada, perfeita para molhos cremosos', 12.99, '/images/fettuccine.jpg');
