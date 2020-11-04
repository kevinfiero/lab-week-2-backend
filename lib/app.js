const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/coffees', async(req, res) => {
  try {
    const data = await client.query('SELECT * from coffees');
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/coffees', async(req, res) => {
  try {
    const data = await client.query('SELECT * from coffees');
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/coffees/:id', async(req, res) => {
  try {
    const coffeeID = req.params.id;

    const data = await client.query(`
      SELECT * FROM coffees 
      WHERE coffees.id=$1
      `, [coffeeID]);
    
    res.json(data.rows[0]);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/coffees/:id', async(req, res) => {
  try {
    const coffeeID = req.params.id;

    const data = await client.query(`
      SELECT * FROM coffees 
      WHERE coffees.id=$1
      `, [coffeeID]);
    
    res.json(data.rows[0]);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.post('/coffees/', async(req, res) => {
  try {

    newNameID = req.body.name_id;
    newName = req.body.name;
    newImage = req.body.image;
    newDescription = req.body.description;
    newCategory = req.body.category;
    newPrice = req.body.price;
    newOnSale = req.body.on_sale;
    newSupplierID = req.body.supplier_id;

    const data = await client.query(`
      INSERT INTO COFFEES (name_id, name, image, description, category, price, on_sale, supplier_id)
      VALUES($1, $2, $3, $4, $5, $6,$7, $8)
      RETURNING *
      `,
    [newNameID, newName, newImage, newDescription, newCategory, newPrice, newOnSale, newSupplierID]);
    res.json(data.rows[0]);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.put('/coffees/:id', async(req, res) => {
  try {
    coffeeID = req.params.id;
    newNameID = req.body.name_id;
    newName = req.body.name;
    newImage = req.body.image;
    newDescription = req.body.description;
    newCategory = req.body.category;
    newPrice = req.body.price;
    newOnSale = req.body.on_sale;
    newSupplierID = req.body.supplier_id;

    const data = await client.query(`
      UPDATE COFFEES
      SET
      name_id = $1, 
      name = $2, 
      image = $3, 
      description = $4, 
      category = $5, 
      price = $6, 
      on_sale = $7, 
      supplier_id = $8
      WHERE COFFEES.ID = $9
      RETURNING *
      `,
    [newNameID, newName, newImage, newDescription, newCategory, newPrice, newOnSale, newSupplierID, coffeeID]);
    res.json(data.rows[0]);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.delete('/coffees/:id', async(req, res) => {
  try {
    coffeeID = req.params.id;

    const data = await client.query(`
      DELETE FROM COFFEES
      WHERE COFFEES.ID = $1
      RETURNING *
      `,
    [coffeeID]);
    res.json(data.rows[0]);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
