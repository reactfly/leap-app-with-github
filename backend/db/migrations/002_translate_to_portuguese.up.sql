-- Update pasta types to Portuguese
UPDATE pasta_types SET 
  name = 'Penne',
  description = 'Massa tubular que segura o molho perfeitamente'
WHERE name = 'Penne';

UPDATE pasta_types SET 
  name = 'Espaguete',
  description = 'Massa longa e fina clássica, versátil para qualquer molho'
WHERE name = 'Espaguete';

UPDATE pasta_types SET 
  name = 'Parafuso',
  description = 'Massa em formato de parafuso, ideal para molhos encorpados'
WHERE name = 'Parafuso';

UPDATE pasta_types SET 
  name = 'Penne Integral',
  description = 'Massa tubular integral, rica em fibras e nutrientes'
WHERE name = 'Penne Integral';

UPDATE pasta_types SET 
  name = 'Fettuccine',
  description = 'Massa larga e achatada, perfeita para molhos cremosos'
WHERE name = 'Fettuccine';

-- Update sauces to Portuguese
UPDATE sauces SET 
  name = 'Alfredo',
  description = 'Molho rico e cremoso de queijo parmesão'
WHERE name = 'Alfredo';

UPDATE sauces SET 
  name = 'Marinara',
  description = 'Molho clássico de tomate com ervas e alho'
WHERE name = 'Marinara';

UPDATE sauces SET 
  name = 'Carbonara',
  description = 'Molho cremoso à base de ovo com pancetta'
WHERE name = 'Carbonara';

UPDATE sauces SET 
  name = 'Pesto',
  description = 'Molho fresco de manjericão, pinhões e parmesão'
WHERE name = 'Pesto';

UPDATE sauces SET 
  name = 'Arrabbiata',
  description = 'Molho picante de tomate com pimentões vermelhos'
WHERE name = 'Arrabbiata';

-- Update ingredients to Portuguese
UPDATE ingredients SET 
  name = 'Frango Grelhado',
  category = 'protein'
WHERE name = 'Grilled Chicken';

UPDATE ingredients SET 
  name = 'Linguiça Italiana',
  category = 'protein'
WHERE name = 'Italian Sausage';

UPDATE ingredients SET 
  name = 'Camarão',
  category = 'protein'
WHERE name = 'Shrimp';

UPDATE ingredients SET 
  name = 'Pancetta',
  category = 'protein'
WHERE name = 'Pancetta';

UPDATE ingredients SET 
  name = 'Cogumelos',
  category = 'vegetable'
WHERE name = 'Mushrooms';

UPDATE ingredients SET 
  name = 'Pimentões',
  category = 'vegetable'
WHERE name = 'Bell Peppers';

UPDATE ingredients SET 
  name = 'Tomate Cereja',
  category = 'vegetable'
WHERE name = 'Cherry Tomatoes';

UPDATE ingredients SET 
  name = 'Espinafre',
  category = 'vegetable'
WHERE name = 'Spinach';

UPDATE ingredients SET 
  name = 'Brócolis',
  category = 'vegetable'
WHERE name = 'Broccoli';

UPDATE ingredients SET 
  name = 'Queijo Parmesão',
  category = 'cheese'
WHERE name = 'Parmesan Cheese';

UPDATE ingredients SET 
  name = 'Mussarela',
  category = 'cheese'
WHERE name = 'Mozzarella';

UPDATE ingredients SET 
  name = 'Ricota',
  category = 'cheese'
WHERE name = 'Ricotta';
