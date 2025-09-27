import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const pastaTypes = [
  { id: 1, name: 'Penne', description: 'Massa tubular que segura o molho perfeitamente', price: 12.99 },
  { id: 2, name: 'Espaguete', description: 'Massa longa e fina clássica, versátil para qualquer molho', price: 11.99 },
  { id: 3, name: 'Parafuso', description: 'Massa em formato de parafuso, ideal para molhos encorpados', price: 11.99 },
  { id: 4, name: 'Penne Integral', description: 'Massa tubular integral, rica em fibras e nutrientes', price: 13.99 },
  { id: 5, name: 'Fettuccine', description: 'Massa larga e achatada, perfeita para molhos cremosos', price: 12.99 }
];

const sauces = [
  { id: 1, name: 'Alfredo', description: 'Molho rico e cremoso de queijo parmesão', price: 3.99 },
  { id: 2, name: 'Marinara', description: 'Molho clássico de tomate com ervas e alho', price: 2.99 },
  { id: 3, name: 'Carbonara', description: 'Molho cremoso à base de ovos com pancetta', price: 4.99 },
  { id: 4, name: 'Pesto', description: 'Molho fresco de manjericão, pinhões e parmesão', price: 3.99 },
  { id: 5, name: 'Arrabbiata', description: 'Molho de tomate picante com pimentões vermelhos', price: 3.99 }
];

const ingredients = [
  { id: 1, name: 'Frango Grelhado', category: 'protein', price: 4.99 },
  { id: 2, name: 'Linguiça Italiana', category: 'protein', price: 5.99 },
  { id: 3, name: 'Camarão', category: 'protein', price: 7.99 },
  { id: 4, name: 'Pancetta', category: 'protein', price: 6.99 },
  { id: 5, name: 'Cogumelos', category: 'vegetable', price: 2.99 },
  { id: 6, name: 'Pimentões', category: 'vegetable', price: 2.99 },
  { id: 7, name: 'Tomates Cereja', category: 'vegetable', price: 3.99 },
  { id: 8, name: 'Espinafre', category: 'vegetable', price: 2.99 },
  { id: 9, name: 'Brócolis', category: 'vegetable', price: 2.99 },
  { id: 10, name: 'Queijo Parmesão', category: 'cheese', price: 1.99 },
  { id: 11, name: 'Muçarela', category: 'cheese', price: 2.99 },
  { id: 12, name: 'Ricota', category: 'cheese', price: 3.99 }
];

// Routes
app.get('/pasta-types', (req, res) => {
  res.json(pastaTypes);
});

app.get('/sauces', (req, res) => {
  res.json(sauces);
});

app.get('/ingredients', (req, res) => {
  const { category } = req.query;
  if (category) {
    const filtered = ingredients.filter(ing => ing.category === category);
    res.json(filtered);
  } else {
    res.json(ingredients);
  }
});

app.post('/orders', (req, res) => {
  const { 
    customer_name, 
    customer_email, 
    customer_phone, 
    delivery_address,
    delivery_notes,
    estimated_time,
    items 
  } = req.body;
  
  // Simulate order creation
  const orderId = Math.floor(Math.random() * 10000) + 1;
  const order = {
    id: orderId,
    customer_name,
    customer_email,
    customer_phone,
    delivery_address: delivery_address || null,
    delivery_notes: delivery_notes || null,
    estimated_time: estimated_time || null,
    items: items.map(item => ({
      ...item,
      pasta_type: pastaTypes.find(p => p.id === item.pasta_type_id),
      sauce: sauces.find(s => s.id === item.sauce_id),
      ingredients: item.ingredient_ids.map(id => ingredients.find(i => i.id === id))
    })),
    status: 'pending',
    created_at: new Date().toISOString(),
    total: items.reduce((sum, item) => {
      const pasta = pastaTypes.find(p => p.id === item.pasta_type_id);
      const sauce = sauces.find(s => s.id === item.sauce_id);
      const ingredientTotal = item.ingredient_ids.reduce((ingSum, id) => {
        const ing = ingredients.find(i => i.id === id);
        return ingSum + (ing ? ing.price : 0);
      }, 0);
      return sum + ((pasta.price + sauce.price + ingredientTotal) * item.quantity);
    }, 0)
  };
  
  console.log('Novo pedido criado:', {
    id: orderId,
    customer: customer_name,
    delivery: !!delivery_address,
    total: order.total
  });
  
  res.json(order);
});

app.get('/orders/:id', (req, res) => {
  const { id } = req.params;
  // Simulate order retrieval
  res.json({
    id: parseInt(id),
    customer_name: 'Cliente Teste',
    customer_email: 'cliente@teste.com',
    customer_phone: '(11) 99999-9999',
    items: [],
    status: 'pending',
    created_at: new Date().toISOString(),
    total: 0
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log('📡 APIs disponíveis:');
  console.log('  GET  /pasta-types');
  console.log('  GET  /sauces');
  console.log('  GET  /ingredients');
  console.log('  POST /orders');
  console.log('  GET  /orders/:id');
});
